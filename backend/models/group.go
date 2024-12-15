package models

import "time"

type Chama struct {
	GroupID   int64  `json:"group_id" gorm:"primaryKey; autoIncrement"`
	Name      string `json:"group_name" gorm:"not null"`
	Email     string `json:"email" gorm:"not null;unique"`
	AccountNo int64  `json:"account_no" gorm:"not null;unique"`
	FileName  string `json:"#"`

	ChairmanName  string `json:"chairman_name" gorm:"not null"`
	ChairmanEmail string `json:"chairman_email" gorm:"not null;unique"`

	SecretaryName  string `json:"secretary_name" gorm:"not null"`
	SecretaryEmail string `json:"secretary_email" gorm:"not null;unique"`

	TreasurerName  string `json:"treasurer_name" gorm:"not null"`
	TreasurerEmail string `json:"treasurer_email" gorm:"not null;unique"`

	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

type Executive struct {
	ExecutiveID int64     `json:"executive_id" gorm:"primaryKey;autoIncrement"`
	Description string    `json:"description" gorm:"not null"`
	CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}
