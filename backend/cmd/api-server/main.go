package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// ✅ CORS (cho frontend gọi)
	r.Use(cors.Default())

	// =========================
	// 🔐 LOGIN API
	// =========================
	r.POST("/auth/login", func(c *gin.Context) {
		var req struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}

		// đọc JSON từ frontend
		if err := c.BindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "invalid request",
			})
			return
		}

		// fake user để test
		if req.Username == "admin" && req.Password == "123" {
			c.JSON(http.StatusOK, gin.H{
				"token": "real-token",
			})
			return
		}

		// sai login
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid username or password",
		})
	})

	// =========================
	// 📚 MANGA API
	// =========================
	r.GET("/manga", func(c *gin.Context) {
		c.JSON(http.StatusOK, []gin.H{
			{"id": "1", "title": "One Piece", "author": "Oda"},
			{"id": "2", "title": "Naruto", "author": "Kishimoto"},
		})
	})

	// =========================
	// 🚀 START SERVER
	// =========================
	r.Run(":8080")
}
