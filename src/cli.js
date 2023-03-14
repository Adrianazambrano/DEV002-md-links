#!/usr/bin/env node
const process = require('process');
const {mdLinks}= require('./index.js');
//  const [, , ...args] = process.argv


const route = process.argv[2]
const option1 = process.argv[3]
 const option2 = process.argv[4]

if(route){
  if (option1 === '--validate' && option2=== undefined) {
     mdLinks(route,{validate:true, stats:false })
    .then(result =>console.debug(result) )
    .catch((error) => {
        console.log(error)
    })
  } else if (option1 === '--stats' && option2 ===undefined ) {
    mdLinks(route,{validate:false, stats:true })
    .then(result => console.debug(result) )
    .catch((error) => {
        console.log(error)
    })
       } else if (option1 === '--stats' && option2 === '--validate' || option1 === '--validate'  && option2 === '--stats' ) {
        mdLinks(route,{validate:true, stats:true })
        .then(result => console.debug(result) )
        .catch((error) => {
            console.log(error)
    })
      } else if (option1 === undefined && option2===undefined) {
        mdLinks(route,{validate:false, stats:false })
        .then(result => console.debug(result) )
        .catch((error) => {
            console.log(error)
        })
      }

} else {
  mdLinks(undefined)
  .then(() => {} )
  .catch((error) => {
      console.log(error)
  })
}

