package models

import "time"

type Contribution struct {
	ID     uint      `json:"id" gorm:"primaryKey"`
	UserID uint      `json:"user_id"`
	Amount float64   `json:"amount"`
	Date   time.Time `json:"date"`
}

