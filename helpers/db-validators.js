const Rol = require('../models/rol');

const Usuario = require('./../models/usuario');

const rolValido = async (rol= '') => {
    const existRol = await Rol.findOne({ rol });
    if (!existRol){
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
} 

const emailExiste = async (correo)=>{
     // verificar correo
     const existeEmail = await Usuario.findOne({ correo });
     if (existeEmail) {
         throw new Error(`El correo ${correo} está registrado en la base de datos`)
     }
}
const idUsuarioExiste = async (id)=>{
     // verificar correo
     const usuarioExiste = await Usuario.findById(id);
     if (!usuarioExiste) {
         throw new Error(`El Id ${id} No existe en la base de datos`)
     }
}



module.exports = {
    rolValido,
    emailExiste,
    idUsuarioExiste
}