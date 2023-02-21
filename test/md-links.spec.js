// const mdLinks = require('../index.js');
const { mdLinks } = require('../index.js');


describe('mdLinks', () => {
  it ('debe ser una funcion',() => {
    console.log('FIX ME');
  });

  //  it('Deberia devolver una promesa', () => {
  //   expect(mdLinks).toBe(typeof Promise);
  // });
  it('Si el path no existe debe rechazar la promesa', () =>  {
    return mdLinks('/este/path/no/existe.md').catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  });

});
