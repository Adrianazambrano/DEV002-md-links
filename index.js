const fs = require('fs');

const mdLinks = (path, options) => {
  return new Promise((resove, reject) => {
    //1. indentificamos si la ruta existe
    if (fs.existsSync(path)) {
      // convertimos a una ruta absoluta
    } else {
      // si no exite rechazamos la promesa
      reject('La ruta no existe')
    }
  })
}

module.exports = {
  mdLinks,
};
