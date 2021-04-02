const express = require('express');
const cors = require('cors')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // Middelwares
        this.middleware();
        // Rutas
        this.routes();
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
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port)
    }

}

module.exports = Server;