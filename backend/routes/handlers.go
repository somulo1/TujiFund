package routes

// function to handle members registration
func registerHandler(w http.ResponseWriter, r *http.Request) {
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
		http.Error(w, "Member already registered", http.StatusConflict)
		return
	}

	members[newMember.ID] = newMember
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "Member registered successfully")
}

// function to handle user registar
func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	type LoginRequest struct {
		Email       string `json:"email"`
		Password string `json:"password"`
	}

	var loginReq LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&loginReq); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	member, exists := members[loginReq.ID]
	if !exists || member.Password != loginReq.Password {
		http.Error(w, "Invalid ID or password", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Login successful")
}