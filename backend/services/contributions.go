package services

import (
	"tujifund/backend/database"
	"tujifund/backend/models"
)

// get group total amount
// get user total savings
// get user total loans
// get user dividends
// get user contribution records to diplay
// generate report and download


// initiate payment >> update db


// GetTotalAmount calculates the total amount for a given userID
func GetTotalAmount(userID uint) (float64, error) {
	var totalAmount float64
	err := database.DB.Model(&models.Transaction{}).
		Where("user_id = ?", userID).
		Select("SUM(amount)").
		Scan(&totalAmount).Error
	return totalAmount, err
}
