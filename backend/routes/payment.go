package routes

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"tujifund/backend/database"
	"tujifund/backend/models"
	"tujifund/backend/services"
)

func MakePaymentHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	if r.URL.Path != "/pay" {
		notFoundErrorHandler(w)
		return
	}
	if r.Method != http.MethodPost {
		wrongMethodErrorHandler(w)
		return
	}

	r.ParseForm()
	amount := r.FormValue("amount")
	phoneNumber := r.FormValue("phoneNumber")

	accessToken, err := services.FetchAccessToken()
	if err != nil {
		http.Error(w, "Failed to fetch access token", http.StatusInternalServerError)
		fmt.Println("Error fetching access token:", err)
		return
	}

	if err := services.MakePayment(accessToken, amount, phoneNumber); err != nil {
		http.Error(w, "Failed to make payment", http.StatusInternalServerError)
		fmt.Println("Error making payment:", err)
		return
	}

	fmt.Fprintf(w, "Payment request processed successfully")
}

// Define the structure for the M-Pesa callback response
type CallbackResponse struct {
	Body struct {
		StkCallback struct {
			MerchantRequestID string `json:"MerchantRequestID"`
			CheckoutRequestID string `json:"CheckoutRequestID"`
			ResultCode        int    `json:"ResultCode"`
			ResultDesc        string `json:"ResultDesc"`
			CallbackMetadata  struct {
				Item []struct {
					Name  string  `json:"Name"`
					Value float64 `json:"Value"`
				} `json:"Item"`
			} `json:"CallbackMetadata"`
		} `json:"stkCallback"`
	} `json:"Body"`
}

// Struct to define the structure of the response to be stored in the JSON file
type StoredResponse struct {
	MerchantRequestID string    `json:"MerchantRequestID"`
	CheckoutRequestID string    `json:"CheckoutRequestID"`
	ResultCode        int       `json:"ResultCode"`
	ResultDesc        string    `json:"ResultDesc"`
	CallbackMetadata  []Item    `json:"CallbackMetadata"`
	Timestamp         time.Time `json:"Timestamp"`
}

type Item struct {
	Name  string  `json:"Name"`
	Value float64 `json:"Value"`
}

func CallbackHandler(w http.ResponseWriter, r *http.Request) {
	// Ensure it's a POST request
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var response CallbackResponse

	// Decode the JSON request body into the response struct
	err := json.NewDecoder(r.Body).Decode(&response)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		log.Printf("Error decoding request body: %v", err)
		return
	}

	// Create a new stored response
	storedResponse := StoredResponse{
		MerchantRequestID: response.Body.StkCallback.MerchantRequestID,
		CheckoutRequestID: response.Body.StkCallback.CheckoutRequestID,
		ResultCode:        response.Body.StkCallback.ResultCode,
		ResultDesc:        response.Body.StkCallback.ResultDesc,
		CallbackMetadata:  []Item{},
		Timestamp:         time.Now(),
	}

	// Variables to store the transaction details
	var amount float64
	var mpesaReceiptNumber string
	var phoneNumber int64
	var transactionDate string

	// Copy metadata items into the stored response
	for _, item := range response.Body.StkCallback.CallbackMetadata.Item {
		storedResponse.CallbackMetadata = append(storedResponse.CallbackMetadata, Item{
			Name:  item.Name,
			Value: item.Value,
		})

		switch item.Name {
		case "Amount":
			amount = item.Value
		case "MpesaReceiptNumber":
			mpesaReceiptNumber = strconv.Itoa(int(item.Value))
		case "TransactionDate":
			transactionDate = strconv.Itoa(int(item.Value))
		case "phoneNumber":
			phoneNumber = int64(item.Value)
		}
	}

	parsedTime, _ := time.Parse("20060102150405", transactionDate)
	transaction := models.Transaction{
		TransactionType:    "deposit",
		Amount:             amount,
		MpesaReceiptNumber: mpesaReceiptNumber,
		PhoneNumber:        phoneNumber,
		CreatedAt:          time.Now(),
		MpesaTime:          parsedTime,
	}

	if err := database.AddTransaction(&transaction); err != nil {
		http.Error(w, "Failed to save transaction", http.StatusInternalServerError)
		log.Printf("Error saving transaction: %v", err)
		return
	}

	// Print out the details
	for _, item := range storedResponse.CallbackMetadata {
		fmt.Printf("{ \"Name\": \"%s\", \"Value\": %v }\n", item.Name, item.Value)
	}

	file, err := os.OpenFile("responses.json", os.O_RDWR|os.O_CREATE, 0o644)
	if err != nil {
		http.Error(w, "Failed to open the file", http.StatusInternalServerError)
		// 	log.Printf("Error opening file: %v", err)
		return
	}
	defer file.Close()

	// Step 2: Read existing data
	data, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, "Error reading file", http.StatusInternalServerError)
		log.Printf("Error reading file: %v", err)
		return
	}

	// Step 3: Parse JSON into a slice
	var responses []StoredResponse
	// if len(data) > 0 {
	// 	err = json.Unmarshal(data, &responses)
	// 	if err != nil {
	// 		http.Error(w, "Error parsing data", http.StatusInternalServerError)

	// 		return
	// 	}
	// }

	err = json.Unmarshal(data, &responses)
	if err != nil {
		// Handle single object case
		var singleResponse StoredResponse
		if err = json.Unmarshal(data, &singleResponse); err == nil {
			responses = []StoredResponse{singleResponse}
		} else {
			fmt.Println("Error parsing JSON:", err)
			log.Printf("Error parsing data: %v", err)
			return
		}
	}

	responses = append(responses, storedResponse)
	// println("here 1")
	// Step 5: Write updated data back to the file
	file.Truncate(0) // Clear existing file content
	file.Seek(0, 0)  // Move to the beginning of the file
	updatedData, _ := json.MarshalIndent(responses, "", "  ")
	_, err = file.Write(updatedData)
	if err != nil {
		http.Error(w, "Error updating data into json file", http.StatusInternalServerError)
		log.Printf("Error updating data into json file: %v", err)
		return
	}
	// Encode the response into the JSON file
	// encoder := json.NewEncoder(file)
	// encoder.SetIndent("", "  ") // Optional: pretty-print the JSON
	// err = encoder.Encode(storedResponse)
	// if err != nil {
	// 	http.Error(w, "Failed to write response to file", http.StatusInternalServerError)
	// 	log.Printf("Error writing to file: %v", err)
	// 	return
	// }

	// println("here 2")
	// Respond to the client about success
	if response.Body.StkCallback.ResultCode == 0 {
		log.Printf("Payment successful for MerchantRequestID: %s, CheckoutRequestID: %s", response.Body.StkCallback.MerchantRequestID, response.Body.StkCallback.CheckoutRequestID)

		// Respond with success message
		// w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		// responseBody := map[string]string{
		// 	"ResponseCode":        "0",
		// 	"ResponseDescription": "Success. Transaction processed successfully.",
		// 	"CustomerMessage":     "Success. Transaction processed successfully.",
		// }
		// json.NewEncoder(w).Encode(responseBody)
	} else {
		log.Printf("Payment failed for MerchantRequestID: %s, CheckoutRequestID: %s", response.Body.StkCallback.MerchantRequestID, response.Body.StkCallback.CheckoutRequestID)
		// println("here 3")
		// Respond with failure message
		// w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		// responseBody := map[string]string{
		// 	"ResponseCode":        fmt.Sprintf("%d", response.Body.StkCallback.ResultCode),
		// 	"ResponseDescription": response.Body.StkCallback.ResultDesc,
		// 	"CustomerMessage":     "Transaction failed. Please try again.",
		// }
		// json.NewEncoder(w).Encode(responseBody)
	}
}
