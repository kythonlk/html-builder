FROM golang:latest

WORKDIR /

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /main

EXPOSE 3001

CMD ["/main"]
