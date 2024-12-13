package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"

	"your-project/config"
	"your-project/routes"
	"your-project/utils"
	"your-project/websocket"
)

func main() {
	// Initialize database connection
	err := utils.InitDB()
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Create a new Gorilla Mux router
	r := mux.NewRouter()

	// Setup API routes
	apiRouter := r.PathPrefix("/api").Subrouter()
	routes.SetupAuthRoutes(apiRouter)
	routes.SetupAdminRoutes(apiRouter)
	routes.SetupMemberRoutes(apiRouter)

	// Setup WebSocket route
	r.HandleFunc("/ws", websocket.HandleWebSocket)

	// Serve static files for the frontend
	spa := spaHandler{staticPath: "frontend/build", indexPath: "index.html"}
	r.PathPrefix("/").Handler(spa)

	// Determine port for HTTP service
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	// Start server
	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

// spaHandler implements the http.Handler interface, so we can use it
// to respond to HTTP requests. The path to the static directory and
// path to the index file within that static directory are used to
// serve the SPA in the given static directory.
type spaHandler struct {
	staticPath string
	indexPath  string
}

func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Get the absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Prepend the path with the path to the static directory
	path = filepath.Join(h.staticPath, path)

	// Check whether a file exists at the given path
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		// File does not exist, serve index.html
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Otherwise, use http.FileServer to serve the static dir
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

