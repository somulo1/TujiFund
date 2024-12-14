package main

import (
	"log"
	"net/http"

	"tujifund/backend/database"
	"tujifund/backend/routes"
	"tujifund/backend/websocket"
)

func main() {
	// Initialize database connection
	database.InitDB()

	// homepage
	http.HandleFunc("/",func(w http.ResponseWriter, r *http.Request) {})


	http.HandleFunc("/register", routes.RegisterUserHandler)
	http.HandleFunc("/register/group", routes.RegisterGroupHandler)

	http.HandleFunc("/login", routes.LoginHandler)
	http.HandleFunc("/total", func(w http.ResponseWriter, r *http.Request) {
		// Call the handler to get total amount for a specific user
		routes.GetTotalAmount(w, r)
	})

	// payment is received
	http.HandleFunc("/pay", routes.MakePaymentHandler)
	http.HandleFunc("/callback", routes.CallbackHandler)

	// live updates throufh web socket route
	http.HandleFunc("/dashboard/update", websocket.HandleWebSocket)
	port := "8080"


	// Start server
	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
