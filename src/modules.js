const { rejects } = require('assert');
const colors = require('colors')
const fs = require('fs');
const { resolve } = require('path');
const path = require('path')
const axios = require('axios');
const { count } = require('console');

// indentificamos si la ruta existe
    const existsRoute = (route) => fs.existsSync(route)

 // La convertimos  a una ruta absoluta
 const routeAbsolute = (route) => {
   const isAbsolute = path.isAbsolute(route);
   if (isAbsolute === true) {
     return route;
   } else {
     const convertedRoute = path.resolve(route);
     return convertedRoute;
   }
 };
 
  // Verificamos si es un directorio:
  const isdirectory = (route) => fs.statSync(route).isDirectory() // return true or false

 // Si es un Archivo,(1)verificamos que la ext sea .md
const isMd = (route) => {
  if(path.extname(route) === '.md') {
    return true
  }  else{
    return false
  }
}

 // si es .md entramos a leer y retornar un array de objetos:
 
 const getLinks = (route) => {
   let arrayLinks = [];
   const textLinks = /\[(\w+.+?)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/gi;
   const links = /\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/gi;
   const text = /\[(\w+.+?)\]/gi;
   return new Promise(function (resolve, reject) {
     fs.readFile(route, "utf-8", (error, data) => {
       if (error) {
         reject(error);
       } else {
         const match = data.match(textLinks);

         match.forEach((item) => {
           const href = item.match(links)[0];
           const descripText = item.match(text)[0];
                    
           arrayLinks.push({ href: href.slice(1,-1), text: descripText.slice(1,-1), file: route });
         });
        
         
         resolve(arrayLinks);
       }
     });
   });
 };

// para las estaditiscas de pasa directamnete el archivo .md o en caso
// de ser directorio, el array de todos los archivos .md

 // si la option = --validate, validar los links encontrados usando axios:
 const validate = (array)=>{
  const validateResult = array.map((link) => {
     return axios.get(link.href)
     .then(response =>{
       return {...link, status:response.status, ok:response.statusText}
     }).catch(err =>{
       return {...link, status:404, ok:'fail'}
     }) 
     
   })
   return Promise.all(validateResult)
 }
 
const stats = (arrayObject) => {
  const arrayhref = arrayObject.map((file) => file.href);
  const arrayDuplicateNoRepeat = new Set(arrayhref);
  return {Total:arrayhref.length, Unique:arrayDuplicateNoRepeat.size};
};

const statsValidate = (arrayObject) => {
  const arrayhref = arrayObject.map((file) => file.href);
  const arrayDuplicateNoRepeat = new Set(arrayhref);
  const broken = arrayObject.filter(file => file.ok==='fail')
  return {Total:arrayhref.length, Unique:arrayDuplicateNoRepeat.size, Broken:broken.length};
}; 

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
  return arrayOfFiles; 
  // retorno un array con todos los archivos del directorio, paara
  // luego validar sin son .md
};  


  module.exports = {
    existsRoute,
    routeAbsolute,
    isdirectory,
    isMd,
    readAllFileDirectory,
    getLinks,
    stats,
    validate,
    statsValidate

  }