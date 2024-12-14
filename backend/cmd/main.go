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

	http.HandleFunc("/pay", routes.MakePaymentHandler)
	http.HandleFunc("/callback",routes.CallbackHandler)

	port := "8080"

	// Start server
	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// // spaHandler implements the http.Handler interface, so we can use it
// // to respond to HTTP requests. The path to the static directory and
// // path to the index file within that static directory are used to
// // serve the SPA in the given static directory.
// type spaHandler struct {
// 	staticPath string
// 	indexPath  string
// }

// func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
// 	// Get the absolute path to prevent directory traversal
// 	path, err := filepath.Abs(r.URL.Path)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	// Prepend the path with the path to the static directory
// 	path = filepath.Join(h.staticPath, path)

// 	// Check whether a file exists at the given path
// 	_, err = os.Stat(path)
// 	if os.IsNotExist(err) {
// 		// File does not exist, serve index.html
// 		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
// 		return
// 	} else if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// Otherwise, use http.FileServer to serve the static dir
// 	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
// }
