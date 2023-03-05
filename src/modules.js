const { rejects } = require('assert');
const colors = require('colors')
const fs = require('fs');
const { resolve } = require('path');
const path = require('path')

 //1. indentificamos si la ruta existe
    const existsRoute = (route) => fs.existsSync(route)

 // 2. La convertimos  a una ruta absoluta
 const routeAbsolute = (route) => {
   const isAbsolute = path.isAbsolute(route);
   if (isAbsolute === true) {
     return route;
   } else {
     const convertedRoute = path.resolve(route);
     return convertedRoute;
   }
 };
 
  //3. Verificamos si es un directorio:
  const isdirectory = (route) => fs.statSync(route).isDirectory() // return true or false

 // 4. Si es un Archivo,(1)verificamos que la ext sea .md
 // si es .md  (2) entramos a leer y (3) retornar un array con todos los links
 const getLinksmd = (route) => {
  // es .md?:
    if((fs.path.extname(route) === '.md') ){
      // extraer los links
      let arrayLinks = []
      const links = /(https?:\/\/)?(www\.)?[a-z0-9.-]+\.(a-z)+/gi
      return new Promise(function(resolve, reject){
        readFile(pathFile,'utf-8', (error,data) =>{
            if(error){
                reject(error)
            }

           const match =  resolve(data.match(links));
           arrayLinks.push({match})
        })
    }) 
    }
    else{
      // no es un archivo .md/ no hay archivos .md 
    }
    //leyendo un archivo:
  
 }

  // 5. Si es un directorio entramos a leer sus archivos y retorna un array con todos
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

// Verificar si los archivos son md :

 



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