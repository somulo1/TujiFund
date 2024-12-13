package models

import "time"

type Report struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name   string `json:"file_name" `
	Type      string    `json:"type"`
	Data      string    `json:"data"`
	CreatedAt time.Time `json:"created_at"`
}

