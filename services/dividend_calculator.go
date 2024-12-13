package services

func CalculateDividends(totalDividend float64) (map[int]float64, error) {
	// 	contributions, err := models.Contributions
	// 	if err != nil {
	// 		return nil, err
	// 	}

	// 	totalContributions := 0.0
	// 	for _, contribution := range contributions {
	// 		totalContributions += contribution.Amount
	// 	}

		dividends := make(map[int]float64)
	// 	for _, contribution := range contributions {
	// 		memberShare := (contribution.Amount / totalContributions) * totalDividend
	// 		dividends[contribution.MemberID] += memberShare
	// 	}

		return dividends, nil
}
