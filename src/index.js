
const colors = require('colors')
const fs = require('fs');
const {existsRoute} = require('./modules')
  // union de los modulos 

console.log('texto con colores'.bgCyan)

const mdLinks = (pathRouter, options) => {
  return new Promise((resolve, reject) => {
   
    if (existsRoute(pathRouter)) {
      fs.readFile(pathRouter,'utf-8',(error,pathRouter) => {
        if(error){
          console.log(error)
        } else{
          console.log(pathRouter.bgMagenta)
          console.log('ext:'+ path.extname(pathRouter).bgBlue)
        }
      })
    } else {
      // si no exite rechazamos la promesa
      reject('La ruta no existe')
    }
  })
}

module.exports = {
  mdLinks,
};
