const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController');
const vacanteController = require('../controllers/vacantesController');
const usuarioController = require('../controllers/usuariosController');
module.exports = () => {
    router.get('/', homeController.mostrarTrabajos);
    
    //crear vacantes
    router.get('/vacantes/nueva', vacanteController.formularioNuevaVacante);
    router.post('/vacantes/nueva', vacanteController.agregarVacante);
    

    //Mostrar Vacante(singular)
    router.get('/vacantes/:url', vacanteController.mostrarVacante);

    //editar Vacante
    router.get('/vacantes/editar/:url', vacanteController.formEditarVacante);
    router.post('/vacantes/editar/:url', vacanteController.editarVacante);


    //Crear cuentas

    router.get('/crear-cuenta', usuarioController.formCrearCuenta);
    router.post('/crear-cuenta', usuarioController.crearUsuario);

    return router;
 
}