package middleware

import "net/http"

func Authenticated(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// TODO: Implement authentication middleware
		next.ServeHTTP(w, r)
	}
}

