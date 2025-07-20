package models

type User struct {
	ID       int     `gorm:"primaryKey;autoIncrement" json:"uid"`
	Name     string  `json:"name"`
	Image    string  `json:"image"`
	Email    string  `json:"email"`
	Password string  `json:"password"`
	Posts    []Posts `gorm:"foreignKey:Uid" json:"contents"`
}
