# Real-time Price Data Website

## Description

This is a mini-website to collect and display real-time price data for stocks or cryptocurrencies.

## Features

- Poll real-time data every few seconds for 5 stocks or crypto from CoinGecko API.
- Store the data in a MongoDB database.
- Display the most recent 20 real-time data entries in a table.
- Dynamically update the table with new data.
- Change the stock or crypto using a modal/popup.

## Tech Stack

- Backend: Express.js, Mongoose, Axios
- Frontend: Next.js, React, Redux, Javascript
- Database: MongoDB

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/repo.git
   cd repo
2. Open split terminals for running frontend and backend
3. To run backend: cd backend >> npm install >> npm run start
4. To run frontend: cd frontend >> npm install >> npm start
