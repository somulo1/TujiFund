package middleware

import "net/http"

func AdminOnly(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// TODO: Implement admin role check middleware
		next.ServeHTTP(w, r)
	}
}

