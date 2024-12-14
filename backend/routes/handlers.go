package routes

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"sync"

	"tujifund/backend/database"
	"tujifund/backend/models"
	"tujifund/backend/services"
)

var mu sync.Mutex // Mutex to handle concurrent access

// function to handle models.User registration
func RegisterUserHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var newUser models.User

	if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	database.AddUser(&newUser)

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "models.User registered successfully")
}

// function to handle models.User login
func LoginHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("enter login backend")
	// Handle preflight requests
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	fmt.Println("Called Successfully")

	type LoginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var loginReq LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&loginReq); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	dbPassword, _, err := database.GetUserPasswd(loginReq.Email)
	if err != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	if dbPassword != loginReq.Password {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	// Add CORS headers to successful responses
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Login successful")
}

// register group handler
func RegisterGroupHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/register/group" {
		println("error wrong path")
		notFoundErrorHandler(w)
		return
	}
	if r.Method != http.MethodPost {
		println("error wrong method")
		wrongMethodErrorHandler(w)
		return
	}

	err := r.ParseMultipartForm(32 << 20)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}

	group := models.Chama{}

	group.Name = r.FormValue("group_name")
	group.Email = r.FormValue("email")
	group.ChairmanName = r.FormValue("chairman_name")
	group.TreasurerName = r.FormValue("treasurer_name")
	group.SecretaryName = r.FormValue("secretary_name")

	group.AccountNo, _ = strconv.ParseInt(r.FormValue("account_no"), 10, 64)
	group.ChairmanEmail = r.FormValue("chairman_email")
	group.TreasurerEmail = r.FormValue("treasurer_email")
	group.SecretaryEmail = r.FormValue("secretary_email")

	fmt.Println("Group Name:", group.Name)
	fmt.Println("Email:", group.Email)
	fmt.Println("Chairman Name:", group.ChairmanName)
	fmt.Println("Treasurer Name:", group.TreasurerName)
	fmt.Println("Secretary Name:", group.SecretaryName)
	fmt.Println("Account No:", group.AccountNo)
	fmt.Println("Chairman Email:", group.ChairmanEmail)
	fmt.Println("Treasurer Email:", group.TreasurerEmail)
	fmt.Println("Secretary Email:", group.SecretaryEmail)

	if group.Name == "" || group.ChairmanName == "" || group.TreasurerName == "" || group.SecretaryName == "" {
		println("empty exec names or group name")
		http.Error(w, "Missing required user details or group name", http.StatusBadRequest)
		return
	}

	password := r.FormValue("password")

	newUser := models.User{
		Name:     group.ChairmanName,
		Email:    group.ChairmanEmail,
		Password: password,
		Role:     "Chairman",
	}
	

	database.AddUser(&newUser)
	// Check if group name is unique
	if database.GroupExists(group.Name) {
		println("error repeated group name")
		http.Error(w, "Group name already exists", http.StatusConflict)
		return
	}
	// verify group name is unique

	// Handle file upload
	file, handler, err := r.FormFile("file")
	if err != nil {
		println("error readinf file")
		internalServerErrorHandler(w)
		return
	}

	defer file.Close()

	// Create a directory to store the file if it doesn't exist
	saveDir := "./uploads"
	if _, err := os.Stat(saveDir); os.IsNotExist(err) {
		if err := os.Mkdir(saveDir, os.ModePerm); err != nil {
			println("error creating file directory")
			http.Error(w, "Unable to create upload directory", http.StatusInternalServerError)
			return
		}
	}

	// Create the destination file
	savePath := filepath.Join(saveDir, handler.Filename)
	destFile, err := os.Create(savePath)
	if err != nil {
		println("error creating file")
		http.Error(w, "Unable to create the file", http.StatusInternalServerError)
		return
	}
	defer destFile.Close()

	// Copy the uploaded file's content to the destination file
	if _, err := io.Copy(destFile, file); err != nil {
		println("error saving file")
		http.Error(w, "Unable to save the file", http.StatusInternalServerError)
		return
	}

	if err := database.AddGroup(&group); err != nil {
		println("error adding group to db")
		http.Error(w, "Failed to save group", http.StatusInternalServerError)
		return
	}

	// add a secret bearer 
	w.Header().Set("Authorization", "Bearer "+"secret_token")
	fmt.Fprintf(w, "<p> Group added sucessfully</p>")
}

func internalServerErrorHandler(w http.ResponseWriter) {
	renderErrorPage(w, http.StatusInternalServerError, "Internal error")
}

func wrongMethodErrorHandler(w http.ResponseWriter) {
	renderErrorPage(w, http.StatusMethodNotAllowed, "Permission denied")
}

func notFoundErrorHandler(w http.ResponseWriter) {
	renderErrorPage(w, http.StatusNotFound, "The page you are looking for does not exist")
}

func badRequestHandler(w http.ResponseWriter) {
	renderErrorPage(w, http.StatusBadRequest, " Try the home page")
}

func renderErrorPage(w http.ResponseWriter, statusCode int, message string) {
	w.WriteHeader(statusCode)
	// tmpl, err := template.ParseFiles("template/error.html")
	// if err != nil {
	// 	log.Println("Error page parsing error:", err)
	// 	http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	// 	return

	// }
	// data := struct {
	// 	Message string
	// }{
	// 	Message: message,
	// }
	// if err := tmpl.Execute(w, data); err != nil {
	log.Println("Error: page execution:", message)
	http.Error(w, "Internal Server Error", statusCode)
	// }
}

func GetTotalAmount(w http.ResponseWriter, r *http.Request) {
	// Get the userID from the query parameter
	userIDParam := r.URL.Query().Get("user_id")
	if userIDParam == "" {
		http.Error(w, "user_id is required", http.StatusBadRequest)
		return
	}

	// Convert userID from string to uint
	userID, err := strconv.ParseUint(userIDParam, 10, 32)
	if err != nil {
		http.Error(w, "Invalid user_id", http.StatusBadRequest)
		return
	}

	// Call the service layer to get the total amount for the user
	totalAmount, err := services.GetTotalAmount(uint(userID))
	if err != nil {
		http.Error(w, "Error calculating total amount", http.StatusInternalServerError)
		return
	}

	// Create the response
	response := map[string]interface{}{
		"user_id":      userID,
		"total_amount": totalAmount,
	}

	// Set content-type header to JSON and write the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
	}
}
