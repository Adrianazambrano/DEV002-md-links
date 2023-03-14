
const process = require('process');
const {mdLinks}= require('./index');


const route = process.argv[1]
const optionUser = process.argv[2]

const options = optionUser.forEach((element) => {
  if (element === "--validate") {
    options = { validate: true, stats: false };
  } else if (element === "--stats") {
    options = { validate: false, stats: true };
  } else if (element === "--stats --validate") {
    options = { validate: true, stat: true };
  } else if (element === undefined) {
    options = { validate: false, stat: false };
  }
});

mdLinks(prueba,options)
.then(()=>{

})
.catch((error) => {
    console.log(error)
})