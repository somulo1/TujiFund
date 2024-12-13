package models

import "time"

type User struct {
	ID             int       `json:"id" gorm:"primaryKey"`
	Name       string    `json:"name" gorm:"not null"`
	Password       string    `json:"password" gorm:"not null"`
	NationalID     string    `json:"national_id" gorm:"not null"`
	Email          string    `json:"email" gorm:"not null;unique"`
	Dob            time.Time `json:"dob" gorm:"type:date"`
	Role           Role      `json:"role" gorm:"default:visitor"`
	Country        string    `json:"country" gorm:"size:50"`
	Gender         string    `json:"gender" gorm:"size:10"`
	CreatedAt      time.Time `json:"created_at" gorm:"autocreateTime"`
	UpdatedAt      time.Time `json:"updated_at" gorm:"autocreateTime"`
}

type Role string

const (
	Member    Role = "member" // Default role
	Chairman  Role = "chairman"
	Secretary Role = "secretary"
	Treasurer Role = "treasurer"
)