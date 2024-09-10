package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/kythonlk/imagetohtml/ai"
	"github.com/kythonlk/imagetohtml/game"
)

func main() {
	handler := SetupRoutes()
	log.Println("Server starting on :3001")
	log.Fatal(http.ListenAndServe(":3001", handler))
}

func SetupRoutes() http.Handler {
	apiKey := os.Getenv("GEM_API")
	if apiKey == "" {
		fmt.Print("GEM_API environment variable is not set")
	}
	
	// HTTP Router
	httpMux := http.NewServeMux()
	// Register API handlers
	registerAPIRoutes(httpMux, apiKey)
	
	// WebSocket Router
	wsMux := http.NewServeMux()
	// Register WebSocket handler
	wsMux.HandleFunc("/ws", game.HandleConnection)
	
	// CORS middleware for HTTP routes
	allowedOrigins := []string{"https://html-builder.netlify.app", "http://localhost:8000"}
	corsHandler := corsMiddleware(allowedOrigins)(httpMux)
	
	// Combined router
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/ws" {
			wsMux.ServeHTTP(w, r)
		} else {
			corsHandler.ServeHTTP(w, r)
		}
	})
}

func registerAPIRoutes(mux *http.ServeMux, apiKey string) {
	// Image processing
	imageProcessor, err := ai.NewImageProcessor(apiKey)
	if err != nil {
		panic(err)
	}
	mux.HandleFunc("/api/img", imageProcessor.ProcessImageHandler)

	// Reimage processing
	reImageProcessor, err := ai.NewReImageProcessor(apiKey)
	if err != nil {
		panic(err)
	}
	mux.HandleFunc("/api/reimg", reImageProcessor.ReProcessImageHandler)
	
	// Prompt processing
	promptProcessor, err := ai.NewPromptProcessor(apiKey)
	if err != nil {
		panic(err)
	}
	mux.HandleFunc("/api/text", promptProcessor.ProcessPrmptHandler)

	// Game image processing
	gameendpoint, err := game.NewImageProcessor(apiKey)
	if err != nil {
		panic(err)
	}
	mux.HandleFunc("/api/game", gameendpoint.ProcessImageHandler)
}

func corsMiddleware(allowedOrigins []string) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            origin := r.Header.Get("Origin")
            isAllowed := false
            for _, allowedOrigin := range allowedOrigins {
                if allowedOrigin == origin {
                    isAllowed = true
                    break
                }
            }

            if isAllowed {
                w.Header().Set("Access-Control-Allow-Origin", origin)
                w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
                if r.Method == http.MethodOptions {
                    w.WriteHeader(http.StatusNoContent)
                    return
                }
            }

            next.ServeHTTP(w, r)
        })
    }
}
