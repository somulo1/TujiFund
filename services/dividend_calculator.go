package services

import (
	"tujifund/backend/models"
)

func CalculateDividends(totalDividend float64) (map[int]float64, error) {
	contributions := []models.Contribution{

	}


	totalContributions := 0.0
	for _, contribution := range contributions {
		totalContributions += contribution.Amount
	}

	dividends := make(map[int]float64)
	for _, contribution := range contributions {
		memberShare := (contribution.Amount / totalContributions) * totalDividend
		dividends[int(contribution.UserID)] += memberShare
	}

	return dividends, nil
}
