const inquirer = require('inquirer')
require('colors')

const inquirerMenu = async () => {
    console.clear()
    console.log('----------------------------' .brightGreen)
    console.log('      Elija una opción      ' .brightWhite)
    console.log('----------------------------\n'.brightGreen)
    const choices =[
        {
            name  : `${'1.'.brightGreen} Buscar ciudad`,
            value : 1
        },
        {
            name  : `${'2.'.brightGreen} Historial`,
            value : 2
        },
        {
            name  : `${'0.'.brightGreen} Salir`,
            value : 0
        },
    ]
    
    const opts = [
        {
            type : 'list',
            name : 'opt',
            message : 'Selecciona una opción',
            choices,
        }
    ]
    const {opt} = await inquirer.prompt(opts)
    return opt;
}

const continuar = [
    {
        type : 'input',
        name : 'enter',
        message : `Dale al ${'ENTER'.brightGreen} para continuar`
    }
]

const pausa = async () => {

    console.log('\n')
    await inquirer.prompt(continuar)     
}

const leerInput = async (message) => {

    const pregunta = [
        {
            type : 'input',
            name : 'desc',
            message,
            validate(value){
                return (value.length !== 0) || 'Necesito una descripción'
            }
        }
    ]

    const {desc} = await inquirer.prompt(pregunta)
    return desc
}
const listadoSeleccionarLugar = async (listadoArr = []) => {
    
    const choices = listadoArr.map((lugar, i) => {

        const iColor = `${i + 1}.`.green; 

        return {
            name : `${iColor} ${lugar.name}`,
            value : lugar
        }
    })
    
    choices.push({name : `${'0.'.green} Salir`, value : 0})

    const pregunta = [
        {
            type : 'list',
            name : 'itemSeleccionado',
            message : 'Elige un lugar',
            choices
        }
    ]
    const {itemSeleccionado} =  await inquirer.prompt(pregunta)
    return itemSeleccionado;
}

const confirmar = async (message) => {
    const pregunta = [
        {
            type : 'confirm',
            name : 'confirmar',
            message,
        }
    ]
    const {confirmar} = await inquirer.prompt(pregunta)
    return confirmar
}


module.exports = {
    listadoSeleccionarLugar,
    inquirerMenu,
    pausa,
    leerInput,
    confirmar,
}