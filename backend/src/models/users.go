package models

type User struct {
	ID       int `gorm:"primaryKey;autoIncrement`
	Name     string
	Email    string
	Password string
}
