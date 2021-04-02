const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const { nombre, apellido } = req.query
    console.log(req);
    res.json({
        msg: 'Get Api - usuariosGet',
        nombre,
        apellido
    })
}

const usuariosPost = (req = request, res = response) => {

    const { nombre, edad } = req.body

    res.json({
        msg: 'Post Api - usuariosPost',
        nombre,
        edad
    })
}

const usuariosPut = (req = request, res = response) => {
    res.json({
        msg: 'Put Api - usuariosPut'
    })
}

const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: 'Delete Api - usuariosDelete'
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}