const openWeatherApi = require('../api/OpenWeather');
const { guardarDB, leerDB } = require('../helpers/repositorio');
class Clima {
    async getclimaLatLon(lat, lon){
        try {  
            const {data} = await openWeatherApi.get('',{params: {lat,lon}})
            if (!data) return ;
            const {weather, main:{temp, temp_min, temp_max}} = data
            const desc =  weather[0].description
            return {temp, temp_min, temp_max, desc}
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Clima