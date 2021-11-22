const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

exports.formularioNuevaVacante = (req,res) => {
    res.render('vacante',{
        nombrePagina: 'devJobs - Nueva Vacante',
        tagline: 'Llena el formulario y publica la vacante'
    })
}

//agregar Vacantes
exports.agregarVacante = async (req,res) => {
    const vacante = new Vacante(req.body);

    //crear arreglo de skills
    vacante.skills = req.body.skills.split(',');

    const nuevaVacante = await vacante.save();

    res.redirect(`/vacantes/${nuevaVacante.url}`);

}

exports.mostrarVacante = async (req,res,next) => {
    const url = req.params.url;
    const vacante = await Vacante.findOne({url}).lean();

    //si no hay resultado
    if(!vacante) return next();
    res.render('vacantes',{
        vacante,
        nombrePagina: vacante.titulo,
        barra: true
    })
}

exports.formEditarVacante = async(req,res,next) => {
    const url = req.params.url;
    const vacante = await Vacante.findOne({url}).lean();

    if(!vacante) return next();

    res.render('editar-vacante',{
        vacante,
        nombrePagina: `Editar - ${vacante.titulo}`
    })
}

exports.editarVacante = async (req,res) => {
    const vacanteActualizada = req.body;
    vacanteActualizada.skills = req.body.skills.split(',');
    const url = req.params.url;
   
    const vacante = await Vacante.findOneAndUpdate({url}, vacanteActualizada,{
        new: true,
        runValidators: true
    }).lean();

    res.redirect(`/vacantes/${vacante.url}`)
}