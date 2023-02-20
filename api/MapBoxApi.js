const { default: axios } = require("axios")

const MapBoxApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        'limit' : 5,
        'language' : 'es',
        'access_token' : process.env.MAPBOX_KEY
    }
})

module.exports = MapBoxApi