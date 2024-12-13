package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	"tujifund/backend/models"
)

// type models.User struct {
// 	ID       string `json:"id"`
// 	Phone    string `json:"phone"`
// 	Email    string `json:"email"`
// 	Password string `json:"password"`
// }

var (
	Users     = make(map[int]models.User) // In-memory store for models.Users (keyed by ID)
	emailToID = make(map[string]string)      // Map to link emails to IDs
	mu        sync.Mutex                     // Mutex to handle concurrent access
)

// function to handle models.User registration
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
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

	if _, exists := Users[newUser.ID]; exists {
		http.Error(w, "models.User with this ID already registered", http.StatusConflict)
		return
	}

	if _, emailExists := emailToID[newUser.Email]; emailExists {
		http.Error(w, "Email already registered", http.StatusConflict)
		return
	}

	// Add models.User to the map
	Users[newUser.ID] = newUser
	emailToID[newUser.Email] = newUser.ID

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

	// Get the models.User ID from the email
	id, exists := emailToID[loginReq.Email]
	if !exists {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	// Get the models.User by ID and check the password
	User := Users[id]
	if User.Password != loginReq.Password {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Login successful")
}
