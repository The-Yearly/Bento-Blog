FROM golang:latest AS builder
WORKDIR /app
COPY src/go.mod src/go.sum ./
RUN go mod download
COPY src/ ./
RUN go build -o server ./cmd/main.go
FROM gcr.io/distroless/base-debian12
WORKDIR /app/src
COPY src/.env ../.env
COPY utils ./utils
COPY --from=builder /app/server .
EXPOSE 3001
CMD ["./server"]
