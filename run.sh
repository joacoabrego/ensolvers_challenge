#!/bin/bash
    source .env
    echo "Starting MySQL server..."
    mysql --user="$DATABASE_USER" --password="$DATABASE_PASSWORD" --execute="CREATE DATABASE todos_db"
    cd challenge-api
    npm run start:dev &
    cd ../challenge-frontend
    npm start
