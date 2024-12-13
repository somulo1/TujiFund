package models

type User struct {
	ID       int   `json:"id" gorm:"primaryKey"`
	Username string `json:"username"`
	Email string `json:"email"`
	Password string `json:"-"`
	Role     string `json:"role"`
}

