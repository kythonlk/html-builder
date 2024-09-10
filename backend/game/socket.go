package game

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// Allow connections from allowed origins
		allowedOrigins := []string{"https://html-builder.netlify.app", "http://localhost:8000"}
		origin := r.Header.Get("Origin")
		for _, allowedOrigin := range allowedOrigins {
			if allowedOrigin == origin {
				return true
			}
		}
		return false
	},
}

func HandleConnection(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Fatal("Error while upgrading connection: ", err)
        return
    }
    defer conn.Close()

    for {
        _, msg, err := conn.ReadMessage()
        if err != nil {
            log.Println("Error while reading message: ", err)
            break
        }
        
        var message map[string]interface{}
        json.Unmarshal(msg, &message)

        // Handle different actions
        // Example: send back an update
        response := map[string]string{
            "status":  "Playing",
            "message": "Game is running",
        }
        resp, _ := json.Marshal(response)
        conn.WriteMessage(websocket.TextMessage, resp)
    }
}
