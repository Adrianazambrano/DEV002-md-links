const {mdLinks}= require('./index');
mdLinks('readme.md')
.then(()=>{

})
.catch((error) => {
    console.log(error)
})