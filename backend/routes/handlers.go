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
	"text/template"

	"tujifund/backend/models"
	"tujifund/backend/database"

)
var (
	mu        sync.Mutex                  // Mutex to handle concurrent access
)

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
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

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

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Login successful")
}

// register group handler

func ResgisterGroupHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/register" {
		notFoundErrorHandler(w)
		return
	}
	if r.Method != http.MethodGet {
		wrongMethodErrorHandler(w)
		return
	}

	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		internalServerErrorHandler(w)
		return
	}

	chairman := models.User{
		Name:  r.FormValue("chairman_name"),
		Email: r.FormValue("chairman_email"),
	}

	treasurer := models.User{
		Name:  r.FormValue("treasurer_name"),
		Email: r.FormValue("treasurer_email"),
	}
	secretary := models.User{
		Name:  r.FormValue("secretary_name"),
		Email: r.FormValue("secretary_email"),
	}
	// Validate form values (e.g., required fields)
	if chairman.Name == "" || treasurer.Name == "" || secretary.Name == "" {
		http.Error(w, "Missing required user details", http.StatusBadRequest)
		return
	}

	groupName := r.FormValue("name")
	if groupName == "" {
		http.Error(w, "Group name is required", http.StatusBadRequest)
		return
	}

	// Check if group name is unique
	if database.GroupExists(groupName) {
		http.Error(w, "Group name already exists", http.StatusConflict)
		return
	}

	accountNoString := r.FormValue("account-no")
	accountNoInt, err := strconv.ParseInt(accountNoString, 10, 64)
	if err != nil {
		badRequestHandler(w)
		return
	}

	group := models.Chama{
		Name:      r.FormValue("name"),
		AccountNo: int64(accountNoInt),
		Chairman:  chairman,
		Secretary: secretary,
		Treasurer: treasurer,
	}
	// verify group name is unique

	// Handle file upload
	// save file
	file, handler, err := r.FormFile("file")
	if err != nil {
		internalServerErrorHandler(w)
		return
	}

	defer file.Close()

	// Create a directory to store the file if it doesn't exist
	saveDir := "./uploads"
	if _, err := os.Stat(saveDir); os.IsNotExist(err) {
		if err := os.Mkdir(saveDir, os.ModePerm); err != nil {
			http.Error(w, "Unable to create upload directory", http.StatusInternalServerError)
			return
		}
	}

	// Create the destination file
	savePath := filepath.Join(saveDir, handler.Filename)
	destFile, err := os.Create(savePath)
	if err != nil {
		http.Error(w, "Unable to create the file", http.StatusInternalServerError)
		return
	}
	defer destFile.Close()

	// Copy the uploaded file's content to the destination file
	if _, err := io.Copy(destFile, file); err != nil {
		http.Error(w, "Unable to save the file", http.StatusInternalServerError)
		return
	}

	if err := database.AddGroup(&group); err != nil {
		http.Error(w, "Failed to save group", http.StatusInternalServerError)
		return
	}

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
	tmpl, err := template.ParseFiles("template/error.html")
	if err != nil {
		log.Println("Error page parsing error:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return

	}
	data := struct {
		Message string
	}{
		Message: message,
	}
	if err := tmpl.Execute(w, data); err != nil {
		log.Println("Error: page execution:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}
