const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

const API_KEY = process.env.API_KEY;
const port = 3000;

app.get("/", (req, res) => {
  const address = req.query.address;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${API_KEY}`;

  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      const cityName = data.name;
      const temperature = data.main.temp;

      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const weatherDescription = data.weather[0].description;
      const icon = data.weather[0].icon;
      const message = `City Name: ${cityName} <br> Temperature: ${temperature} <br>SunsetTime:${sunsetTime} <br> Weather Description: ${weatherDescription}`;
      res.send(`<hmtl> <body><h1>${message} </h1></body></html>`);
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.send(`<h1>Internal Server Error ${error.message}</h1>`);
    });
});

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}/`);
});
