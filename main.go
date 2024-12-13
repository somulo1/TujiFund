package main

import (
	"fmt"
	"net/http"
	a"Tujifund/backend/routes"
)

// main function  begins here
func main() {
	http.HandleFunc("/register",a. RegisterHandler)
	http.HandleFunc("/login", a.LoginHandler)

	fmt.Println("Server is running on port 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
