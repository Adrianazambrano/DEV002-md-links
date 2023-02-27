const fs = require('fs');
const colors = require('colors')
console.log('texto con colores'.bgCyan)

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //1. indentificamos si la ruta existe
    if (fs.existsSync(path)) {
      // convertimos a una ruta absoluta
      // Probar si la ruta absoluta es un archivo o directorio
      // si es un archivo devolver un arreglo de este archivo, pero si es un directirioo
      // sera un arreglo con TODOS los archivos MD, si no hay archivos MD devuelve un array vacio
      // y si es vacio entonces se rechaza la promesa 
    } else {
      // si no exite rechazamos la promesa
      reject('La ruta no existe')
    }
  })
}

module.exports = {
  mdLinks,
};
