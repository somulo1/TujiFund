package models

import "time"

type Transaction struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	UserID    uint      `json:"user_id" gorm:"not null;index"`
	Type      string    `json:"type" gorm:"not null"` // e.g., "deposit", "withdrawal", "saving","loan-payment",
	Amount    float64   `json:"amount" gorm:"not null"`
	ChamaID   int64     `json:"chama_id" gorm:"not null;index"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	MpesaReceiptNumber string `json:"mpesa_receipt_no" gorm:"not null"`
	PhoneNumber int64 `json:"phone_number" gorm:"not null"`
	MpesaTime  time.Time `json:"paid_at" gorm:"not null"`
}



