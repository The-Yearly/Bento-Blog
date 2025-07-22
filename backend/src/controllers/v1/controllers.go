package controllers_v1

import (
	"backend/db"
	"backend/models"
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
	Likes   int       `json:"likes"`
	Fav     bool      `json:"fav"`
	Tags    []string  `json:"tags"`
	User    struct {
		Name  string `json:"name"`
		Image string `json:"image"`
	}
}

func GetPosts(ctx *gin.Context) {
	content := ctx.Param("type")
	var posts []models.Posts
	res := db.DB.Model(&posts).Preload("User").Where("content=?", content).Order("time DESC").Find(&posts)
	var post []returnPost
	if res.Error == nil {
		for _, g := range posts {
			post = append(post, returnPost{
				ID:      g.ID,
				Uid:     g.User.ID,
				Title:   g.Title,
				Image:   g.Image,
				Time:    g.Time,
				Desc:    g.Desc,
				Content: g.Content,
				Likes:   g.Likes,
				Fav:     g.Fav,
				Tags:    g.Tags,
				User: struct {
					Name  string "json:\"name\""
					Image string "json:\"image\""
				}{
					Name:  g.User.Name,
					Image: g.User.Image,
				},
			})
		}
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
	res := db.DB.Model(&posts).Preload("User").Order("time DESC").Limit(10).Find(&posts)
	if res.Error == nil {
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
				Likes:   g.Likes,
				Fav:     g.Fav,
				Tags:    g.Tags,
				User: struct {
					Name  string "json:\"name\""
					Image string "json:\"image\""
				}{
					Name:  g.User.Name,
					Image: g.User.Image,
				},
			})
		}
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

func GetTop3Feat(ctx *gin.Context) {
	var Posts []models.Posts
	res := db.DB.Model(&Posts).Limit(3).Order("time DESC").Limit(3).Where("fav=?", true).Find(&Posts)
	if res.Error == nil {
		var returnData []returnPost
		for _, g := range Posts {
			returnData = append(returnData, returnPost{
				ID:      g.ID,
				Uid:     g.Uid,
				Title:   g.Title,
				Image:   g.Image,
				Time:    g.Time,
				Desc:    g.Desc,
				Content: g.Content,
				Likes:   g.Likes,
				Fav:     g.Fav,
				Tags:    g.Tags,
				User: struct {
					Name  string "json:\"name\""
					Image string "json:\"image\""
				}{
					Name:  g.User.Name,
					Image: g.User.Image,
				},
			})
		}
		ctx.JSON(200, gin.H{
			"message": "Success",
			"data":    returnData,
		})
	}
}
