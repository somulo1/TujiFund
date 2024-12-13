package controllers

import (
	"encoding/json"
	"net/http"
	"your-project/models"
)

func AddContribution(w http.ResponseWriter, r *http.Request) {
	var contribution models.Contribution
	if err := json.NewDecoder(r.Body).Decode(&contribution); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Save contribution to the database
	if err := db.Create(&contribution).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func GetDividends(w http.ResponseWriter, r *http.Request) {
	var user models.User
	// Assume user is fetched from context or session

	var contributions []models.Contribution
	if err := db.Where("user_id = ?", user.ID).Find(&contributions).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Calculate dividends based on contributions
	var totalDividends float64
	for _, contribution := range contributions {
		totalDividends += contribution.Amount * 0.1 // Example calculation
	}

	response := map[string]float64{"dividends": totalDividends}
	json.NewEncoder(w).Encode(response)
}
