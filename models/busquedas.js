const { default: axios } = require("axios")

class Busquedas{
    
    _historial = []
    get historial(){
        return this._historial
    }
    get paramsMapBox() {
        return {
            'limit' : 5,
            'language' : 'es',
            'access_token' : process.env.MAPBOX_KEY
        }
    }
    async porCiudad(lugar = ''){
        try {
            const apiGeo = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params : this.paramsMapBox
            })
            const {data: {features = []}} = await apiGeo.get()
            return features.map(({id,place_name_es,center}) => {
                return {
                    id,
                    place_name_es,
                    lng: center[0],
                    lat: center[1]
                }
            })      
        } catch (error) {
            console.log(error)
            return []
        }
    }

}


module.exports = Busquedas