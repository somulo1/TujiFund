package models

import "time"

type Transaction struct {
	ID                 uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	UserID             uint      `json:"user_id" gorm:"not null;index"`
	TransactionType    string    `json:"transaction_type" gorm:"not null"`
	Amount             float64   `json:"amount" gorm:"not null"`
	ChamaID            int64     `json:"chama_id" gorm:"not null;index"`
	CreatedAt          time.Time `json:"created_at" gorm:"autoCreateTime"`
	MpesaReceiptNumber string    `json:"mpesa_receipt_no" gorm:"not null"`
	PhoneNumber        int64     `json:"phone_number" gorm:"not null"`
	MpesaTime          time.Time `json:"paid_at" gorm:"not null"`
}

type LoanApplication struct {
	ID                uint      `gorm:"primaryKey" json:"id"`
	UserID            uint      `gorm:"index;not null" json:"user_id"`            // Foreign key to the User table
	User              User      `gorm:"constraint:OnDelete:CASCADE;" json:"user"` // Association with User
	Amount            float64   `gorm:"not null" json:"amount"`
	DurationMonths    int       `gorm:"not null" json:"duration_months"`
	LoanStatus        string    `gorm:"not null" json:"loan_status"`
	PaymentStatus     string    `gorm:"not null" json:"payment_status"`// type:enum('defaulted', 'paid', 'partially_paid');default:'partially_paid'"
	InterestRate      float64   `gorm:"not null" json:"interest_rate"`
	MaximumLoanAmount float64   `gorm:"not null" json:"maximum_loan_amount"`
	PaidAmount        float64   `gorm:"default:0" json:"paid_amount"`
	Guarantors        []User    `gorm:"many2many:loan_guarantors" json:"guarantors"`
	AppliedAt         time.Time `gorm:"autoCreateTime" json:"applied_at"`
	UpdatedAt         time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
