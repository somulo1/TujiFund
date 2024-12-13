package models

import "time"

type Transaction struct {
	ID     uint      `json:"id" gorm:"primaryKey"`
	UserID uint      `json:"user_id"`
	Type   string    `json:"type"`
	Amount float64   `json:"amount"`
	Date   time.Time `json:"date"`
}

