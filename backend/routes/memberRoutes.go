package routes

import (
	"net/http"

	"tujifund/backend/controllers"
	"tujifund/backend/middleware"
)

func SetupMemberRoutes(mux *http.ServeMux) {
	mux.Handle("/api/contributions", middleware.Authenticated(http.HandlerFunc(controllers.AddContribution)))
	mux.Handle("/api/dividends", middleware.Authenticated(http.HandlerFunc(controllers.GetDividends)))
}
