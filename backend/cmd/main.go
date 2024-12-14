package main

import (
	"log"
	"net/http"

	"tujifund/backend/database"
	"tujifund/backend/routes"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

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

	// // CORS configuration
	// corsObj := handlers.AllowedOrigins([]string{" http://localhost:5174"}) // Allow all origins
	handlerWithCORS := c.Handler(r)

	port := "8080"
	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handlerWithCORS))
}
