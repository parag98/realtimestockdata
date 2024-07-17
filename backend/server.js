const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const Data = require('./models/stockdata');
const dataRoutes = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 5000;
const INTERVAL = 60000; // Polling interval in milliseconds (1 minute)

app.use(cors());
app.use(express.json());
app.use('/api/data', dataRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

const fetchData = async () => {
  const symbols = ['GOOG', 'AAPL', 'MSFT', 'AMZN', 'TSLA'];
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  try {
    for (const symbol of symbols) {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol,
          interval: '1min',
          apikey: apiKey
        }
      });
      console.log(response);

      const timeSeries = response.data['Time Series (1min)'];
      const latestTimestamp = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestTimestamp];

      const newData = new Data({
        symbol,
        price: parseFloat(latestData['1. open']),
        timestamp: new Date(latestTimestamp)
      });

      await newData.save();
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

setInterval(fetchData, INTERVAL);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
