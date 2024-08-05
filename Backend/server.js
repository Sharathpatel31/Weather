const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')


const apiKey = 'cd01c6e136945877e1fe7d75ef558ffc'; // Replace with your OpenWeatherMap API key
app.use(cors())
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.json({ error: 'Please provide a city name' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const fetch = await import('node-fetch').then(mod => mod.default);
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod !== 200) {
            return res.json({ error: data.message });
        }

        res.json({
            city: data.name,
            temperature: data.main.temp,
            weather: data.weather[0].description
        });
    } catch (error) {
        res.json({ error: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});
