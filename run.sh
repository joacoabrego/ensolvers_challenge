#!/bin/bash
    echo "Enter your MySQL username:"
    read username
    echo "Enter your MySQL password:"
    read password
    echo "Checking if MySQL service is running.."
    apt install sysvinit-utils
    service mysql start
    echo "Starting MySQL server..."
    mysql --user="$user" --password="$password"
    cd challenge-api
    npm run start:dev