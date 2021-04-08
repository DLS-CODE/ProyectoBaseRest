const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/valildar-campos');
const { rolValido, emailExiste, idUsuarioExiste } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete } = require('../controller/usuarios.controller');

router.get('/', usuariosGet)

router.post('/', [
    //Check es un meddelware que captura el error colocandolo en una cola para posteriormente mostrarlos en donde se desea
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),  
    check('password', 'El password debe de se más de 6 letras').isLength(),  
    check('correo', 'El correo es inválido').isEmail(),  
    check('correo').custom(emailExiste),
    // check('rol', 'El rol es inválido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( rolValido ),
    validarCampos,
], usuariosPost)

router.put('/:id',[
    check('id', 'No es un campo valido').isMongoId(), 
    check('id').custom( idUsuarioExiste ),
    check('rol').custom( rolValido ),
    validarCampos,
], usuariosPut)

router.delete('/:id',[
    check('id', 'No es un campo valido').isMongoId(), 
    check('id').custom( idUsuarioExiste ),
    validarCampos
], usuariosDelete)

module.exports = router;