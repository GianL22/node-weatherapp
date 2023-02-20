const MapBoxApi = require("../api/MapBoxApi")
const { guardarDB, leerDB } = require("../helpers/repositorio")
class Busquedas{
    _historial = []
    constructor(){
        const {historial : historialDB} = leerDB()
        if (historialDB) this._historial = [...historialDB]
    }
    get historial(){
        return this._historial
    }
    get historialCapitalizado () {
        return this._historial.map(lugar => lugar.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "))
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
    agregarLugarAlHistorial(lugar = ''){
        if ( this._historial.includes(lugar.toLocaleLowerCase()) ) return ;
        this._historial.unshift(lugar.toLocaleLowerCase())
        const payload = {historial : this._historial}
        guardarDB(payload)
    }
    
}
module.exports = Busquedas