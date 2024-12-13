package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	// Routes
	r.HandleFunc("/api/contributions", getContributions).Methods("GET")
	r.HandleFunc("/api/contributions", addContribution).Methods("POST")
	r.HandleFunc("/api/dividends", calculateDividends).Methods("GET")

	// Start server
	log.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func getContributions(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement fetching contributions from database
}

func addContribution(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement adding a new contribution to database
}

func calculateDividends(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement dividend calculation logic
}

