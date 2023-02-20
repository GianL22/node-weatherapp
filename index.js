require('dotenv').config()

const {inquirerMenu, pausa, leerInput} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {
    const busquedas = new Busquedas()    
    const opciones = {
        1: async () => {
            /*
            1. mostrar mensaje 
            2. buscar lugar
            3. seleccionar lugar
            4. mostrar clima
            5. mostrar resultados
            */
            const lugar  = await leerInput('¿Cual es tu ciudad?')
            const resBusqueda =  await busquedas.porCiudad(lugar)
            console.log(resBusqueda)
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