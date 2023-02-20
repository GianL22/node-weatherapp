const MapBoxApi = require("../api/MapBoxApi")
class Busquedas{
    _historial = []
    get historial(){
        return this._historial
    }
    async porCiudad(lugar = ''){
        try {
            const {data: {features = []}} = await MapBoxApi.get(`/${lugar}.json`)
            return features.map(({id,place_name_es,center}) => {
                return {
                    id,
                    name : place_name_es,
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