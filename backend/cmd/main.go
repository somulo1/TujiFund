package main

import (
	"log"
	"net/http"

	"tujifund/backend/database"
	"tujifund/backend/routes"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// CORS middleware to handle cross-origin requests
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", " http://localhost:5174") // Adjust origin as needed
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

	r := mux.NewRouter()

	// Create a new CORS handler
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5174"},  // Allow the React app's origin
		AllowedMethods: []string{"GET", "POST", "OPTIONS"}, // Allow specific methods
		AllowedHeaders: []string{"Content-Type"},           // Allow specific headers
	})
	// Define routes
	r.HandleFunc("/register", routes.RegisterUserHandler).Methods("POST")
	r.HandleFunc("/register/group", routes.RegisterGroupHandler).Methods("POST")
	r.HandleFunc("/login", routes.LoginHandler).Methods("POST")
	r.HandleFunc("/total", func(w http.ResponseWriter, r *http.Request) {
		routes.GetTotalAmount(w, r)
	}).Methods("GET")
	r.HandleFunc("/pay", routes.MakePaymentHandler).Methods("POST")
	r.HandleFunc("/callback", routes.CallbackHandler).Methods("POST")

	// CORS configuration
	corsObj := handlers.AllowedOrigins([]string{" http://localhost:5174"}) // Allow all origins
	handlerWithCORS := handlers.CORS(corsObj)(r)

	port := "8080"
	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handlerWithCORS))
}
