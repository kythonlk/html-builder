package main

import (
	"log"
	"net/http"

	"github.com/kythonlk/imagetohtml/ai"
)

func main() {
	handler := ai.SetupRoutes()
	log.Println("Server starting on :5000")
	log.Fatal(http.ListenAndServe(":5000", handler))
}
