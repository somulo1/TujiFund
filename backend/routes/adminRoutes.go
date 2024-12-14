package routes

import (
	"net/http"

	"tujifund/backend/controllers"
	"tujifund/backend/middleware"
)

func SetupAdminRoutes(mux *http.ServeMux) {
	mux.Handle("/api/admin/members", middleware.AdminOnly(http.HandlerFunc(controllers.GetAllMembers)))
	mux.Handle("/api/admin/members/update", middleware.AdminOnly(http.HandlerFunc(controllers.UpdateMember)))
}
