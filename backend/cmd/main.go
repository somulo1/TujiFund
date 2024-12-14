package main

import (
	"log"
	"net/http"

	"tujifund/backend/database"
	"tujifund/backend/routes"
)

// CORS middleware to handle cross-origin requests
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*") // Adjust origin as needed
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight requests
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Pass to the next handler
		next.ServeHTTP(w, r)
	})
}

func main() {
	// Initialize database connection
	database.InitDB()

	mux := http.NewServeMux()

	// Define routes
	mux.HandleFunc("/register", routes.RegisterUserHandler)
	mux.HandleFunc("/register/group", routes.RegisterGroupHandler)
	mux.HandleFunc("/login", routes.LoginHandler)
	mux.HandleFunc("/total", func(w http.ResponseWriter, r *http.Request) {
		routes.GetTotalAmount(w, r)
	})
	mux.HandleFunc("/pay", routes.MakePaymentHandler)
	mux.HandleFunc("/callback", routes.CallbackHandler)

	// Wrap the server with CORS middleware
	handlerWithCORS := corsMiddleware(mux)

	port := "8080"
	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handlerWithCORS))
}
