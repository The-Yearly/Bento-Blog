package models

import "time"

type Posts struct {
	ID      int       `gorm:"primaryKey;autoIncrement" json:"cont_id"`
	Uid     int       `json:"uid"`
	Title   *string   `json:"title"`
	Image   *string   `json:"image"`
	Time    time.Time `gorm:"autoCreateTime" json:"time"`
	Desc    *string   `json:"desc"`
	Content string    `json:"content"`
	User    User      `gorm:"foreignKey:Uid;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"user"`
}
