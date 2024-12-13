package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
)

type Member struct {
	ID       string `json:"id"`
	Phone    string `json:"phone"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

var (
	members   = make(map[string]Member) // In-memory store for members (keyed by ID)
	emailToID = make(map[string]string) // Map to link emails to IDs
	mu        sync.Mutex                // Mutex to handle concurrent access
)

// function to handle member registration
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var newMember Member
	if err := json.NewDecoder(r.Body).Decode(&newMember); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	if _, exists := members[newMember.ID]; exists {
		http.Error(w, "Member with this ID already registered", http.StatusConflict)
		return
	}

	if _, emailExists := emailToID[newMember.Email]; emailExists {
		http.Error(w, "Email already registered", http.StatusConflict)
		return
	}

	// Add member to the map
	members[newMember.ID] = newMember
	emailToID[newMember.Email] = newMember.ID

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "Member registered successfully")
}

// function to handle member login
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

	// Get the member ID from the email
	id, exists := emailToID[loginReq.Email]
	if !exists {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	// Get the member by ID and check the password
	member := members[id]
	if member.Password != loginReq.Password {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Login successful")
}
