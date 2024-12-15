package routes

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"mime/multipart"
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

// CORS middleware function
func enableCORS(handler http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Set CORS headers for all responses
        w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5174")
        w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
        w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
        w.Header().Set("Access-Control-Allow-Credentials", "true")

        // Handle preflight requests
        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }

        // Call the actual handler
        handler(w, r)
    }
}

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
	// Set headers for CORS
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5174")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	// Handle preflight requests
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request method",
		})
		return
	}

	type LoginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var loginReq LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&loginReq); err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid request body",
		})
		return
	}

	// Hardcoded test credentials
	testCredentials := map[string]struct {
		password string
		role     string
	}{
		"chairman@test.com": {
			password: "chairman123",
			role:     "Chairman",
		},
		"treasurer@test.com": {
			password: "treasurer123",
			role:     "Treasurer",
		},
		"secretary@test.com": {
			password: "secretary123",
			role:     "Secretary",
		},
		"member@test.com": {
			password: "member123",
			role:     "Member",
		},
	}

	// Check if the email exists in test credentials
	if creds, exists := testCredentials[loginReq.Email]; exists {
		if creds.password == loginReq.Password {
			// Successful login
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"success": true,
				"message": "Login successful",
				"user": map[string]interface{}{
					"email": loginReq.Email,
					"role":  creds.role,
				},
			})
			return
		}
	}

	// Invalid credentials
	w.WriteHeader(http.StatusUnauthorized)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": false,
		"message": "Invalid email or password",
	})
}

// register group handler
func RegisterGroupHandler(w http.ResponseWriter, r *http.Request) {
    // Set response headers consistently at the start
    w.Header().Set("Content-Type", "application/json")
    
    // Validate request method first
    if r.Method != http.MethodPost {
        sendJSONError(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

    // Validate endpoint path
    if r.URL.Path != "/register/group" {
        sendJSONError(w, "Invalid endpoint", http.StatusNotFound)
        return
    }

    // Parse multipart form with explicit size limit
    const maxFileSize = 10 << 20 // 10 MB
    if err := r.ParseMultipartForm(maxFileSize); err != nil {
        sendJSONError(w, "Error parsing form data: file size may be too large", http.StatusBadRequest)
        return
    }

    // Extract and validate group data
    group := models.Chama{
        Name:           r.FormValue("group_name"),
        Email:          r.FormValue("email"),
        ChairmanName:  r.FormValue("chairman_name"),
        TreasurerName: r.FormValue("treasurer_name"),
        SecretaryName: r.FormValue("secretary_name"),
        ChairmanEmail: r.FormValue("chairman_email"),
        TreasurerEmail: r.FormValue("treasurer_email"),
        SecretaryEmail: r.FormValue("secretary_email"),
    }

    // Parse account number separately to handle conversion errors
    if accountNo, err := strconv.ParseInt(r.FormValue("account_no"), 10, 64); err == nil {
        group.AccountNo = accountNo
    } else {
        sendJSONError(w, "Invalid account number format", http.StatusBadRequest)
        return
    }

    // Validate required group fields
    if !isValidGroup(&group) {
        sendJSONError(w, "Missing required group fields", http.StatusBadRequest)
        return
    }

    // Extract and validate chairman password
    chairmanPassword := r.FormValue("chairman_password")
    if chairmanPassword == "" {
        sendJSONError(w, "Chairman password is required", http.StatusBadRequest)
        return
    }

    // Check if group already exists
    if database.GroupExists(group.Name) {
        sendJSONError(w, "Group name already exists", http.StatusConflict)
        return
    }

    // Handle file upload
    file, handler, err := r.FormFile("file")
    if err != nil {
        sendJSONError(w, "Document upload is required", http.StatusBadRequest)
        return
    }
    defer file.Close()

    // Save uploaded file
    _, err = saveUploadedFile(file, handler)
    if err != nil {
        sendJSONError(w, "Failed to save uploaded file: "+err.Error(), http.StatusInternalServerError)
        return
    }

    // Create chairman user account
    chairman := models.User{
        Name:     group.ChairmanName,
        Email:    group.ChairmanEmail,
        Password: chairmanPassword,
        Role:     "Chairman",
    }

    // Save chairman account
    if err := database.AddUser(&chairman); err != nil {
        sendJSONError(w, "Failed to create chairman account", http.StatusInternalServerError)
        return
    }

    // Save group data
    if err := database.AddGroup(&group); err != nil {
        sendJSONError(w, "Failed to save group", http.StatusInternalServerError)
        return
    }

    // Send success response
    sendJSONResponse(w, http.StatusCreated, map[string]interface{}{
        "success": true,
        "message": "Group registered successfully",
        "group": map[string]interface{}{
            "name":          group.Name,
            "email":         group.Email,
            "chairman_name": group.ChairmanName,
        },
    })
}

// Helper function to validate group data
func isValidGroup(group *models.Chama) bool {
    return group.Name != "" && 
           group.ChairmanName != "" && 
           group.TreasurerName != "" && 
           group.SecretaryName != ""
}

// Helper function to save uploaded file
func saveUploadedFile(file multipart.File, handler *multipart.FileHeader) (string, error) {
    saveDir := "./uploads"
    if err := os.MkdirAll(saveDir, os.ModePerm); err != nil {
        return "", fmt.Errorf("failed to create upload directory: %v", err)
    }

    savePath := filepath.Join(saveDir, handler.Filename)
    destFile, err := os.Create(savePath)
    if err != nil {
        return "", fmt.Errorf("failed to create destination file: %v", err)
    }
    defer destFile.Close()

    if _, err := io.Copy(destFile, file); err != nil {
        return "", fmt.Errorf("failed to save file: %v", err)
    }

    return savePath, nil
}

// Helper function to send JSON error responses
func sendJSONError(w http.ResponseWriter, message string, status int) {
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(map[string]interface{}{
        "success": false,
        "message": message,
    })
}

// Helper function to send JSON responses
func sendJSONResponse(w http.ResponseWriter, status int, data interface{}) {
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(data)
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
