const {mdLinks}= require('../index.js');
mdLinks('unaruta/que/no/existe.md')
.then(()=>{

})
.catch((error) => {
    console.log(error)
})