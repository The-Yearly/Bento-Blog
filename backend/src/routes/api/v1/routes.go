package v1

import (
	controllers_v1 "backend/controllers/v1"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	router := r.Group("/api/v1")
	router.GET("/ping", controllers_v1.Test1)
	router.GET("/test", controllers_v1.Test2)
	router.GET("/help", controllers_v1.Test3)
}
