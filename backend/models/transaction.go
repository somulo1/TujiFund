package models

import "time"

type Transaction struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	UserID    uint      `json:"user_id" gorm:"not null;index"`
	Type      string    `json:"type" gorm:"not null"` // e.g., "deposit", "withdrawal"
	Amount    float64   `json:"amount" gorm:"not null"`
	ChamaID   int64     `json:"chama_id" gorm:"not null;index"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
}

type Chama struct {
	GroupID   int64  `json:"group_id" gorm:"primaryKey; autoIncrement"`
	Name      string `json:"group_name" gorm:"not null"`
	Email     string `json:"email" gorm:"not null;unique"`
	AccountNo int64  `json:"account_no" gorm:"not null;unique"`

	// Relations
	ChairmanID int64 `json:"chairman_id" gorm:"not null"`
	Chairman   User  `json:"chairman" gorm:"foreignKey:ChairmanID"`

	SecretaryID int64 `json:"secretary_id" gorm:"not null"`
	Secretary   User  `json:"secretary" gorm:"foreignKey:SecretaryID"`

	TreasurerID int64 `json:"treasurer_id" gorm:"not null"`
	Treasurer   User  `json:"treasurer" gorm:"foreignKey:TreasurerID"`

	ExecutiveID int64     `json:"executive_id" gorm:"not null"`
	Executive   Executive `json:"executive_team" gorm:"foreignKey:ExecutiveID"`

	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

type Executive struct {
	ExecutiveID int64     `json:"executive_id" gorm:"primaryKey;autoIncrement"`
	Description string    `json:"description" gorm:"not null"`
	CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}
