package controllers_v1

import (
	"backend/db"
	"backend/models"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

type returnPost struct {
	ID      int       `json:"cont_id"`
	Uid     int       `json:"uid"`
	Title   *string   `json:"title"`
	Image   *string   `json:"image"`
	Time    time.Time `gorm:"autoCreateTime" json:"time"`
	Desc    *string   `json:"desc"`
	Content string    `json:"content"`
	User    struct {
		Name  string `json:"name"`
		Image string `json:"image"`
	}
}

func Test1(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Hello World",
	})
}

func Test2(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Hello Test",
	})
}

func Test3(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "HELP",
	})
}

func GetBites(ctx *gin.Context) {
	content := ctx.Param("type")
	var posts []models.Posts
	fmt.Println("Hi")
	res := db.DB.Model(&posts).Preload("User").Where("content=?", content).Order("time DESC").Find(&posts)
	var post []returnPost
	for _, g := range posts {
		post = append(post, returnPost{
			ID:      g.ID,
			Uid:     g.User.ID,
			Title:   g.Title,
			Image:   g.Image,
			Time:    g.Time,
			Desc:    g.Desc,
			Content: g.Content,
			User: struct {
				Name  string "json:\"name\""
				Image string "json:\"image\""
			}{
				Name:  g.User.Name,
				Image: g.User.Image,
			},
		})
	}
	if res.Error == nil {
		ctx.JSON(200, gin.H{
			"message": "Successfully Retrivied",
			"data":    post,
		})
	} else {
		ctx.JSON(500, gin.H{
			"message": "Server Error",
		})
	}
}

func GetRecents(ctx *gin.Context) {
	var posts []models.Posts
	res := db.DB.Model(&posts).Preload("User").Order("time DESC").Find(&posts)
	var post []returnPost
	for _, g := range posts {
		post = append(post, returnPost{
			ID:      g.ID,
			Uid:     g.User.ID,
			Title:   g.Title,
			Image:   g.Image,
			Time:    g.Time,
			Desc:    g.Desc,
			Content: g.Content,
			User: struct {
				Name  string "json:\"name\""
				Image string "json:\"image\""
			}{
				Name:  g.User.Name,
				Image: g.User.Image,
			},
		})
	}
	if res.Error == nil {
		ctx.JSON(200, gin.H{
			"message": "Successfully Retrivied",
			"data":    post,
		})
	} else {
		ctx.JSON(500, gin.H{
			"message": "Server Error",
		})
	}
}
