package controllers_v1

import (
	"backend/db"
	"backend/models"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
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
type Creds struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var secretKey = []byte("secret-key")

func createToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": username,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
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
	res := db.DB.Model(&posts).Preload("User").Order("time DESC").Find(&posts)
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

func GetIndivitual(ctx *gin.Context) {
	content := ctx.Param("type")
	idStr := ctx.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		ctx.JSON(500, gin.H{"error": "Invalid ID"})
		return
	}
	var posts []models.Posts
	res := db.DB.Model(&posts).Preload("User").Where("content=? AND id=?", content, id).Order("time DESC").Find(&posts)
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

func Post(ctx *gin.Context) {
	var newPost models.Posts
	if err := ctx.ShouldBindJSON(&newPost); err != nil {
		ctx.JSON(400, gin.H{"message": "Invalid request"})
		ctx.Abort()
		return
	}
	db.DB.Create(&newPost)

}
func Update(ctx *gin.Context) {
	var updatePost models.Posts
	var currentPost models.Posts
	if err := ctx.ShouldBindJSON(&updatePost); err != nil {
		fmt.Println(err)
		ctx.JSON(403, gin.H{"message": "Invalid JSON"})
		return
	}
	fmt.Println("JSkjh")
	if err := db.DB.First(&currentPost, updatePost.ID).Error; err != nil {
		ctx.JSON(404, gin.H{"message": "Post not found"})
		return
	}

	if err := db.DB.Model(&currentPost).Updates(updatePost).Error; err != nil {
		fmt.Println("Ji")
		ctx.JSON(403, gin.H{"message": "Failed to update post"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Post updated successfully"})
}

func Delete(ctx *gin.Context) {
	id := ctx.Param("id")
	err := db.DB.Where("id=?", id).Delete(&models.Posts{}).Error
	if err != nil {
		ctx.JSON(500, gin.H{"message": "Failed to update post"})
		return
	}
	ctx.JSON(200, gin.H{"message": "Post Deleted"})
}

func SignIn(ctx *gin.Context) {
	var User models.User
	var Creds Creds
	err := ctx.ShouldBindJSON(&Creds)
	if err != nil {
		ctx.JSON(403, gin.H{"message": "Server Error"})
		return
	}
	fmt.Println(Creds)
	res := db.DB.Where("email = ?", Creds.Email).First(&User)
	if res.Error != nil {
		ctx.JSON(404, gin.H{"message": "User Not Found"})
	}
	if User.Password == Creds.Password {
		token, _ := createToken(User.Email)
		User.Session = &token
		fmt.Println(User)
		db.DB.Save(&User)
		ctx.JSON(200, gin.H{"message": "Succesfull Login", "token": &token, "uid": User.ID})
		return

	} else {
		ctx.JSON(403, gin.H{"message": "Invalid Password"})
		return
	}
}
