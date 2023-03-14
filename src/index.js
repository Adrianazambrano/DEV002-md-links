
const colors = require('colors');
const { resolve } = require('dns');
const fs = require('fs');
const {existsRoute,
  routeAbsolute,
  isMd,
  isdirectory,
  readAllFileDirectory,
  getLinks,
  validate,
  stats,
  statsValidate
} = require('./modules')
  // union de los modulos 

const mdLinks = (pathRouter, options) => {
   return new Promise((resolve, reject) => {
      //1. Verificamos si se ingreso una ruta
    if (pathRouter === undefined){
       reject('No has ingresado una ruta')
    }
     //2. Verificamos si la ruta existe
    if (existsRoute(pathRouter)) {
     
      //3. si la ruta existe convertirla en absoluta
      const absoluteRoute = routeAbsolute(pathRouter);
    
      // 4.Verificamos si es un archivo o un directorio
      
      if (isdirectory(absoluteRoute)) {
       
      const arrayAllFile = readAllFileDirectory(absoluteRoute); 
     
      const arrayAllFileMd= arrayAllFile.filter(file => isMd(file))
      
       const arrayObject = arrayAllFileMd.map((file)=>getLinks(file))
            
      if(options.validate === false && options.stats === false){
          resolve( Promise.all(arrayObject))
      } else if (options.validate === true && options.stats === false){
        const ArrayPromiseResolve = Promise.all(arrayObject);
        
        ArrayPromiseResolve.then((result)=>{
          const arrayAplanado = result.flat()
          const arrayValidate = validate(arrayAplanado)
          resolve( arrayValidate)
          
         })
                
      } else if (options.validate === false && options.stats === true){
        const ArrayPromiseResolve = Promise.all(arrayObject);
        
        ArrayPromiseResolve.then((result)=>{
          const arrayAplanado = result.flat()
          const arrayStats = stats(arrayAplanado)
          resolve( arrayStats)
          
         })
       
      } else if (options.validate === true && options.stats === true){
          const ArrayPromiseResolve = Promise.all(arrayObject);
          ArrayPromiseResolve.then((result)=>{
          const arrayAplanado = result.flat()
          const arrayStatsValidate = statsValidate(arrayAplanado)
          resolve( arrayStatsValidate)
          
         })
     } 
     // -------------    VALIDACIONES PARA ARCHIVO    --------------  
      } else {
            reject('No es directorio' )
        // 5. si no es un directorio, entonces es un archivo
        //  verificamos de que sea un .md, sino es .md entonces se rechaza la promesa
        if(isMd(absoluteRoute) === true){ 
                
           getLinks(absoluteRoute)
           .then((resu)=>{
            const arrayObjeto = resu
            if(options.validate === false && options.stats === false){
                 resolve(console.log(arrayObjeto)) 
            } else if(options.validate === true && options.stats === false){
              validate(arrayObjeto).then((re)=>{ 
                resolve(console.log(re)) 
              }) 
            } else if(options.validate === false && options.stats === true){
                resolve (console.log(stats(arrayObjeto)))
            } else if (options.validate === true && options.stats === true){
              resolve(console.log(statsValidate(arrayObjeto)))
            }

          }).catch((err)=>{reject(err)}) 
                              
        } 
          else{
            reject('No es un archivo de ext .md')
        }
           
        
      }
    } else {
       reject("La ruta no existe");
    }
  });
};

 mdLinks('../prueba',{validate:true , stats:true})
 .then((result) => console.debug(result) )
        .catch((error) => {
         console.log(error)
       })

module.exports = {
  mdLinks,
};
