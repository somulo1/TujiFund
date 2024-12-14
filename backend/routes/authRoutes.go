package routes

import (
	"net/http"

	"tujifund/backend/controllers"
)

func SetupAuthRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/login", controllers.Login)
	mux.HandleFunc("/api/register", controllers.Register)
}

