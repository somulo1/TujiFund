package websocket

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"tujifund/backend/services"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	// Upgrade the HTTP connection to a WebSocket connection
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		// Handle error
		return
	}
	defer conn.Close()

	log.Println("WebSocket connection established")

	for {
		// Get the financial data (group, personal, savings, and loan amounts)
		financialData, err := services.GetFinancialData()
		if err != nil {
			log.Println("Error fetching financial data:", err)
			return
		}
		// Convert the financial data to JSON
		financialDataJSON, err := json.Marshal(financialData)
		if err != nil {
			log.Println("Error marshalling JSON:", err)
			return
		}

		// Send the JSON data to the WebSocket client
		err = conn.WriteMessage(websocket.TextMessage, financialDataJSON)
		if err != nil {
			log.Println("Error sending WebSocket message:", err)
			return
		}

		// Sleep for 5 seconds before sending the next update
		time.Sleep(5 * time.Second)
	}
}
