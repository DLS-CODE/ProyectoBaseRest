const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('./../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })

}

const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol });

    // encriptar contraseña
    const salt = bcryptjs.genSaltSync(); //vueltas de encriptacion que recibira el string
    usuario.password = bcryptjs.hashSync(password, salt); //se encripta en una sola via con el metodo hashSync

    // guardar en DB
    await usuario.save();

    res.json({
        msg: 'Post Api - usuariosPost',
        usuario
    })
}

const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body

    // validar contra base de datos
    if (password) {
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync(); //vueltas de encriptacion que recibira el string
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await Usuario.findByIdAndUpdate(id, resto)
    const usuario = await Usuario.findById(id)
    console.log(usuario);

    res.json({
        msg: 'Put Api - usuariosPut',
        usuario
    })
}

const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    res.json({
        usuario
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}