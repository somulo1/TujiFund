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

// FinancialData struct to hold the different financial amounts
type FinancialData struct {
	GroupAmount     float64 `json:"groupAmount"`
	PersonalAmount  float64 `json:"personalAmount"`
	SavingsAmount   float64 `json:"savingsAmount"`
	LoanAmount      float64 `json:"loanAmount"`
	DividendsAmount float64 `json:"dividendsAmount"`
}

// GetTotalAmount calculates the total amount for a given userID
func GetUserTotalAmount(userID uint) (float64, error) {
	var totalAmount float64
	err := database.DB.Model(&models.Transaction{}).
		Where("user_id = ?", userID).
		Select("SUM(amount)").
		Scan(&totalAmount).Error
	return totalAmount, err
}

func GetGroupTotalAmount(groupID uint) (float64, error) {
	var totalAmount float64
	err := database.DB.Model(&models.Transaction{}).
		Where("group_id = ?", groupID).
		Select("SUM(amount)").
		Scan(&totalAmount).Error
	return totalAmount, err
}

func GetUserLoanAmount(userID uint) (float64, error) {
	var totalLoaned float64

	// Query to calculate total loaned amount for disbursed loans with 'partially_paid' or 'default' payment status
	err := database.DB.Model(&models.LoanApplication{}).
		Where("user_id = ? AND loan_status = ? AND payment_status IN ?", userID, "disbursed", []string{"partially_paid", "default"}).
		Select("SUM(amount * (1 + (interest_rate / 100))) - SUM(paid_amount)").
		Scan(&totalLoaned).Error

	return totalLoaned, err
}

func GetUserSavingsAmount(userID uint) (float64, error) {
	var totalAmount float64
	err := database.DB.Model(&models.Transaction{}).
		Where("user_id = ? AND transaction_type = ?", userID, "savings").
		Select("SUM(amount)").
		Scan(&totalAmount).Error
	return totalAmount, err
}

func GetFinancialData()(FinancialData, error) {

	savingsAmount, err  := GetUserSavingsAmount(1)
	if err != nil {
		// return FinancialData{}, err
		savingsAmount = 0.0
	}
	groupTotalAmount, err  := GetGroupTotalAmount(1)
	if err != nil {
		// return FinancialData{}, err
		groupTotalAmount = 0.0
	}
	userTotalAmount, err  := GetUserSavingsAmount(1)
	if err != nil {
		// return FinancialData{}, err
		userTotalAmount = 0.0
	}
	userLoanAmount, err  := GetUserSavingsAmount(1)
	if err != nil {
		// return FinancialData{}, err
		userLoanAmount = 0.0
	}
	// Simulate fetching data (replace this with actual database queries)
	// Example data, in a real scenario you would fetch these values from your database
	return FinancialData{
		GroupAmount:    groupTotalAmount, // Example group amount
		PersonalAmount: userTotalAmount,  // Example personal amount
		SavingsAmount:  savingsAmount,  // Example savings amount
		LoanAmount:     userLoanAmount, // Example loan amount
	}, nil
}
