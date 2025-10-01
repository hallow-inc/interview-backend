#!/usr/bin/env bash

set -e

echo "======================================="
echo "  Interview Database Setup"
echo "======================================="
echo ""

if docker ps -a --format '{{.Names}}' | grep -q "^my-interview-db$"; then
    echo "Container 'my-interview-db' already exists."
    read -p "Do you want to remove it and start fresh? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Removing existing container..."
        docker rm -f my-interview-db && docker image rm interview-db:latest
    else
        echo "Exiting. Please remove the container manually or use a different name."
        exit 1
    fi
fi

if ! docker images --format '{{.Repository}}:{{.Tag}}' | grep -q "^interview-db:latest$"; then
    echo "Image not found. Building interview-db:latest..."
    docker build -t interview-db:latest .
    echo ""
fi

echo "Enter the database password:"
read PASSWORD
echo ""

if [ -z "$PASSWORD" ]; then
    echo "ERROR: Password can't be empty"
    exit 1
fi

echo "Starting database container..."
docker run -d \
  -p 63306:3306 \
  -e MYSQL_ROOT_PASSWORD="$PASSWORD" \
  --name my-interview-db \
  interview-db:latest

echo ""
echo "Waiting for database to initialize..."
sleep 3

if docker ps --format '{{.Names}}' | grep -q "^my-interview-db$"; then
    echo ""
    echo "Database is running!"
    echo ""
else
    echo ""
    echo "ERROR: Failed to start database. Check logs:"
    echo "  docker logs my-interview-db"
    exit 1
fi
