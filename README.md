# task-manager
a simple task manager
# Server Setup Guide

This README provides detailed instructions on how to set up and run the server for this project. The server relies on a MySQL database and specific environment settings defined in a `.env ` file.

## Prerequisites

Before proceeding, ensure you have the following installed:
- **Node.js**: [Node.js](https://nodejs.org/) runtime environment.
- **npm**: Comes with Node.js, but you can check [npm's installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) if needed.
- **MySQL**: Database system used by the server. Installation guides can be found on the [MySQL official website](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/).

## Setup Instructions

Follow these steps carefully to ensure a successful setup of the server environment and the database.

### Step 1: Create the MySQL Database

Before launching the server, create the MySQL database:
1. Log into your MySQL environment (using MySQL Workbench, command line, or another tool).
2. Execute the following SQL command to create a new database:
   ```sql 
   CREATE DATABASE taskmanager;
3. Ensure the MySQL server is running.

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

plaintextCopy code

`MYSQL_HOST=127.0.0.1 MYSQL_USER=user MYSQL_PASSWORD=password PORT=3000 TOKEN_KEY=ASDF MYSQL_DATABASE=taskmanager`

**Important:** For security, ensure to change the `MYSQL_PASSWORD` and `TOKEN_KEY` values before deploying in a production environment.

### Step 3: Install Dependencies

Open your terminal, navigate to the project directory, and run the following command to install all necessary dependencies:

bashCopy code

`npm install`

### Step 4: Run the Server
After setting up the database and installing all dependencies, start the server by running:

bashCopy code

`node server`

The server will launch and listen on the port specified in your `.env` file (`3000` by default). Access the server at `http://localhost:3000`.

The server will launch and listen on the port specified in your .env file (3000 by default). Access the server at http://localhost:3000.