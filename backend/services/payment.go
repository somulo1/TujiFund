package services

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

const (
	businessShortCode = "174379" // 880100
	passKey           = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
)


func generateTimestamp() string {
	now := time.Now()
	return now.Format("20060102150405")
}

func base64Encode(str string) string {
	return base64.StdEncoding.EncodeToString([]byte(str))
}

// FetchAccessToken retrieves an access token from Safaricom's OAuth endpoint
func FetchAccessToken() (string, error) {
	url := "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
	method := "GET"
	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)
	if err != nil {
		fmt.Println(err)
	}

	// update Headers

	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", "Basic eTIzYk1POWJyM3A1V3lHS2xDTE1pbkZhZTM4WGJHc2E5RXdIaFZnSFhXVHFjR0xBOlA1N3ZyYTZwc2dOQXJFbHZkWmREaUVGejNQUEx3Mm00Y3hxVEFsM3RCcTE5czhZeVZjTjUwOUFwcFdwcDJNZk8=")

	res, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to read response body: %v", err)
	}

	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	fmt.Println(string(body)) // Read and log the response body
	if err != nil {
		return "", fmt.Errorf("failed to read response body: %v", err)
	}
	fmt.Printf("Response Body: %s\n", body)

	// Parse JSON response
	var response map[string]interface{}
	if err := json.Unmarshal(body, &response); err != nil {
		return "", fmt.Errorf("failed to parse response: %v", err)
	}

	// Extract access token
	accessToken, ok := response["access_token"].(string)
	if !ok {
		return "", fmt.Errorf("access token not found in response")
	}

	return accessToken, nil
}

func MakePayment(accessToken, amount, phoneNumber string) error {
	timestamp := generateTimestamp()
	passwordToEncode := businessShortCode + passKey + timestamp
	base64Password := base64Encode(passwordToEncode)

	payload := map[string]interface{}{
		"BusinessShortCode": businessShortCode,
		"Password":          base64Password,
		"Timestamp":         timestamp,
		"TransactionType":   "CustomerPayBillOnline",
		"Amount":            amount,
		"PartyA":            phoneNumber,
		"PartyB":            businessShortCode, // Business account number?? 880100
		"PhoneNumber":       phoneNumber,
		"CallBackURL":       "http:/localhost:8080/callback",
		"AccountReference":  "tujifund",
		"TransactionDesc":   "chamacontribution",
	}

	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("error marshalling payment payload: %w", err)
	}

	req, err := http.NewRequest(http.MethodPost, "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", bytes.NewBuffer(payloadBytes))
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+accessToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("payment request failed: %s", resp.Status)
	}

	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return err
	}

	fmt.Println("Payment Response:", result)
	return nil
}

