package routes

import (
	"net/http"

	"your-project/controllers"
	"your-project/middleware"
)

func SetupMemberRoutes(mux *http.ServeMux) {
	mux.Handle("/api/contributions", middleware.Authenticated(http.HandlerFunc(controllers.AddContribution)))
	mux.Handle("/api/dividends", middleware.Authenticated(http.HandlerFunc(controllers.GetDividends)))
}

