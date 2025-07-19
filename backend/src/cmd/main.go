package main

import (
	"backend/db"
	"backend/models"
	v1 "backend/routes/api/v1"
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	db.ConnectToDb()
	db.DB.AutoMigrate(models.User{})
	v1.RegisterRoutes(r)
	fmt.Println("Server Is running In http://localhost:3001/")
	r.Run(":3001")
}
