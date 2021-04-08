const express = require('express');
const cors = require('cors');
const route = require('../routes/usuarios')
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // Conectar a la Base de Datos
        this.coneccionDB();

        // Middelwares
        this.middleware();
        
        // Rutas
        this.routes();
    }

    async coneccionDB(){
        await dbConnection();
    }

    middleware() {
        // Directorio Publico
        this.app.use(express.static('public'));

        // Lectura y parseo del Body
        this.app.use(express.json());

        // CORS
        this.app.use(cors());

    }

    routes() {
        this.app.use(this.usuariosPath, route)
    }

    listen() {
        this.app.listen(this.port)
    }

}

module.exports = Server;