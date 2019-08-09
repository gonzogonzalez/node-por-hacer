const fs = require('fs');
let listadoPorHacer = [];

const guardaDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err)
    })
}

const cargarDB = () => {
    // trycatch para asegurar que el archivo JSON siempre tenga un arreglo vacio y no de error cuando este vacio el archivo
    try {
        listadoPorHacer = require('../db/data.json');
    } catch {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {
    //cargamos base de datos
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardaDB();
    return porHacer;
}

const getListado = () => {
    //cargamos base de datos
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    //cargamos base de datos
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardaDB();
        //la tarea fue completada exitosamente
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    //cargamos base de datos
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    // Si está borrando nos regresa un verdadero; se compara la longitud de ambos arreglos para saber si realmente se esta borrando
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardaDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}