const colors = require('colors')
const fs = require('fs');
const path = require('path')
// const {isAbsolute} = require('path')

 //1. indentificamos si la ruta existe
    const existsRoute = (route) => fs.existsSync(route)
 // 2. La convertimos  a una ruta absoluta
 const routeAbsolute = (route) => {
   const isAbsolute = path.isAbsolute(route);
   if (isAbsolute === true) {
     return route;
   } else {
     const convertedRoute = path.resolve(router);
     return convertedRoute;
   }
 };
  //3. Verificamos si es un directorio:
  const isdirectory = (route) => fs.statSync(route).isDirectory() // return true or false
 
  // 4. Si es un directorio entramos a leer sus archivos y retorna un array con todos
const readAllFileDirectory = (route, arrayOfFiles = []) => {
  const files = fs.readdirSync(route); // leemos cada uno de sus archivos o file
  files.forEach((file) => {
    const stat = fs.statSync(`${route}/${file}`);
    if (stat.isDirectory()) {
      readAllFileDirectory(`${route}/${file}`, arrayOfFiles); // llamada recursiva
    } else {
      arrayOfFiles.push(`${route}/${file}`);
    }
  });
  return arrayOfFiles; // retorno un array con todos los archivos del directorio, paara
  // luego validar sin son .md
};  


 // leyendo un archivo:
  fs.readFile(pathRouter,'utf-8',(error,pathRouter) => {
    if(error){
      console.log(error)
    } else{
      console.log(pathRouter.bgMagenta)
      console.log('ext:'+ path.extname(pathRouter).bgBlue)
    }
  })
 



  // Probar si la ruta absoluta es un archivo o directorio
  // si es un archivo devolver un arreglo de este archivo, pero si es un directirioo
  // sera un arreglo con TODOS los archivos MD, si no hay archivos MD devuelve un array vacio
  // y si es vacio entonces se rechaza la promesa
  module.exports = {
    existsRoute,
    routeAbsolute,
    isdirectory,
    readAllFileDirectory

  }