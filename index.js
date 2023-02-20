require('dotenv').config()

const {inquirerMenu, listadoSeleccionarLugar, pausa, leerInput} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
const Clima = require('./models/clima');

const main = async () => {
    const busquedas = new Busquedas()    
    const clima = new Clima()
    const opciones = {
        1: async () => {
            const lugar  = await leerInput('¿Cual es tu ciudad?')
            const resBusqueda =  await busquedas.porCiudad(lugar)
            const lugarSeleccionado = await listadoSeleccionarLugar(resBusqueda)
            if (!lugarSeleccionado) return
            const {temp, temp_min, temp_max, desc} = await clima.getclimaLatLon(lugarSeleccionado.lat, lugarSeleccionado.lng)
            console.clear()
            console.log('\nInformación de la ciudad'.brightGreen)            
            console.log('Ciudad', lugarSeleccionado.name)
            console.log('lat', lugarSeleccionado.lat)
            console.log('lng', lugarSeleccionado.lng)
            console.log('descripción', desc)
            console.log('Temperatura',temp)
            console.log('Mínima',temp_min)
            console.log('Máxima',temp_max)

        },
        2: () => {},
        0: () => {}
    }
    let opt 
    do {
        opt = await inquirerMenu()
        await opciones[opt]()
        if (opt !== 0) await pausa()
    } while (opt !== 0);
}
main()