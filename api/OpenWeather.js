const { default: axios } = require("axios")

const openWeatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
        appid:process.env.OPENWEATHER_KEY,
        units:'metric',
        lang:'es'
    }
})

module.exports = openWeatherApi