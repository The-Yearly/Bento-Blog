package controllers_v1

import "github.com/gin-gonic/gin"

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
