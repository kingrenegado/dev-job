const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');

exports.formCrearCuenta = (req,res) => {
    res.render('crear-cuenta',{
        nombrePagina: 'Crear Cuenta en DevJobs',
        tagline:'Comienza a publicar tus vacantes gratis solo debes crear tu cuenta'
    })
}
exports.crearUsuario = async(req,res,next) => {
    //crear usuario
    const usuario = new Usuarios(req.body);

    const nuevoUsuario = await usuario.save();

    if(!nuevoUsuario) return next();

    res.redirect('/iniciar-sesion');
}