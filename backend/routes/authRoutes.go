package routes

import (
	"net/http"

	"your-project/controllers"
)

func SetupAuthRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/login", controllers.Login)
	mux.HandleFunc("/api/register", controllers.Register)
}

