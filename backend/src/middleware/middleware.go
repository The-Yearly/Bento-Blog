package middleware

import (
	"backend/db"
	"backend/models"
	"fmt"

	"github.com/gin-gonic/gin"
)

func SessionMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var user models.User
		var newPost models.Posts
		token := ctx.Param("session")
		if err := ctx.ShouldBindJSON(&newPost); err != nil {
			ctx.JSON(400, gin.H{"message": "Invalid request"})
			ctx.Abort()
			return
		}
		if err := db.DB.First(&user, newPost.Uid).Error; err != nil {
			ctx.JSON(404, gin.H{"message": "User not found"})
			ctx.Abort()
			return
		}
		if *user.Session != token {
			ctx.JSON(403, gin.H{"message": "Session does not match"})
			ctx.Abort()
			return
		}
		fmt.Println("OKOKOK")
		ctx.Next()
	}
}
