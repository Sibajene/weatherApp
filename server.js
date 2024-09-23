const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const sequelize = require('./models/db');
const SearchHistory = require('./models/SearchHistory');

sequelize.sync().then(() => {
    console.log('Database & tables created!');
});
const axios = require('axios');

// Get current weather
app.get('/api/weather/current', async (req, res) => {
    const { city, country } = req.query;
    try {
        const response = await axios.get(`https://api.weatherbit.io/v2.0/current`, {
            params: {
                city: `${city},${country}`,
                key: process.env.WEATHER_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Get 16-day forecast
app.get('/api/weather/forecast', async (req, res) => {
    const { city, country } = req.query;
    try {
        const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily`, {
            params: {
                city: `${city},${country}`,
                key: process.env.WEATHER_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});
