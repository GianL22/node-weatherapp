const openWeatherApi = require('../api/OpenWeather')
class Clima {
    async getclimaLatLon(lat, lon){
        try {  
            const {weather, main:{temp, temp_min, temp_max}} = await openWeatherApi.get('',{params: {lat,lon}})
            const desc =  weather[0].description
            return {temp, temp_min, temp_max, desc}
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Clima