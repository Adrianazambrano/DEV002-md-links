
const colors = require('colors')
const fs = require('fs');
const {existsRoute,
  routeAbsolute,
  isdirectory,
  readAllFileDirectory
} = require('./modules')
  // union de los modulos 

console.log('texto con colores'.bgCyan)

const mdLinks = (pathRouter, options) => {
     
    if (existsRoute(pathRouter)) { 
       
      const absoluteRoute = routeAbsolute (pathRouter) 
      if (isdirectory(absoluteRoute)){
        readAllFileDirectory(absoluteRoute)
      }
      else{

      }
    } 
    
   
     else {
      // si no exite rechazamos la promesa
      reject('La ruta no existe')
    }
  })
}

module.exports = {
  mdLinks,
};
