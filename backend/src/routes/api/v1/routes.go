package v1

import (
	controllers_v1 "backend/controllers/v1"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	router := r.Group("/api/v1")
	router.GET("/getPosts/:type", controllers_v1.GetPosts)
	router.GET("/getTop3Feat", controllers_v1.GetTop3Feat)
	router.GET("/getRecentActivity", controllers_v1.GetRecents)
	router.GET("/getPosts/:type/:id", controllers_v1.GetIndivitual)
	router.POST("/post/:session", middleware.SessionMiddleware(), controllers_v1.Post)
	router.POST("/update/:session", middleware.SessionMiddleware(), controllers_v1.Update)
	router.POST("/delete/:id", controllers_v1.Delete)
	router.POST("/signIn", controllers_v1.SignIn)
	router.POST("/updateLike", controllers_v1.UpdateLike)
}
