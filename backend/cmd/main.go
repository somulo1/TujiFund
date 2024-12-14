package main

import (
	"log"
	"net/http"
	"tujifund/backend/database"
	"tujifund/backend/routes"
)

func main() {
	// Initialize database connection
	database.InitDB()
	// if err != nil {
	// 	log.Fatalf("Failed to initialize database: %v", err)
	// }

	http.HandleFunc("/register", routes.RegisterUserHandler)
	http.HandleFunc("/register/group", routes.RegisterGroupHandler)

	http.HandleFunc("/login", routes.LoginHandler)
	http.HandleFunc("/total", func(w http.ResponseWriter, r *http.Request) {
		// Call the handler to get total amount for a specific user
		routes.GetTotalAmount(w, r)
	})


	http.HandleFunc("/pay", routes.MakePaymentHandler)
	http.HandleFunc("/callback",routes.CallbackHandler)

	port := "8080"

	// Start server
	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}