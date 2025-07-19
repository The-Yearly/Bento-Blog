package db

import (
	"fmt"
	"log"
	"os"

	"github.com/lpernett/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDb() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Failed To Find Env")
	}
	dsn := fmt.Sprintf("host=%s user=%s dbname=%s port=5432 sslmode=disable", os.Getenv("db_host"), os.Getenv("user"), os.Getenv("dbname"))
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed To Connect To Db")
	}
	DB = db
	fmt.Println("Successfully Connected To Db")
}
