package models

import (
	"time"

	"github.com/lib/pq"
)

type Posts struct {
	ID      int            `gorm:"primaryKey;autoIncrement" json:"cont_id"`
	Uid     int            `json:"uid"`
	Title   *string        `json:"title"`
	Image   *string        `json:"image"`
	Time    time.Time      `gorm:"autoCreateTime" json:"time"`
	Desc    *string        `json:"desc"`
	Content string         `json:"content"`
	User    User           `gorm:"foreignKey:Uid;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"user"`
	Likes   int            `json:"likes"`
	Fav     bool           `json:"fav"`
	Tags    pq.StringArray `gorm:"type:text[]" json:"tags"`
}
