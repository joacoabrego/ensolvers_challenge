#!/bin/bash
    source .env
    echo "Starting MySQL server..."
    mysql --user="$DATABASE_USER" --password="$DATABASE_PASSWORD" --execute="CREATE DATABASE todos_db"
    cd challenge-api
    npm install &
    process_id=$!
    wait $process_id
    npm run start:dev &
    process_id=$!
    cd ../challenge-frontend
    npm install &
    wait
    npm start
