package services

import (
	"tujifund/backend/database"
	"tujifund/backend/models"
)

func AddGuarantorsToLoan(applicationID uint, guarantorIDs []uint) error {
	var loan models.LoanApplication
	if err := database.DB.First(&loan, applicationID).Error; err != nil {
		return err
	}

	var guarantors []models.User
	if err := database.DB.Where("id IN ?", guarantorIDs).Find(&guarantors).Error; err != nil {
		return err
	}

	// Associate guarantors with the loan
	return database.DB.Model(&loan).Association("Guarantors").Append(&guarantors)
}

