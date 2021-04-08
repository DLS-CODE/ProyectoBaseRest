const mongoose = require('mongoose');

const dbConnection = async()=>{

    try {

        await mongoose.connect(process.env.CONNECTION_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('Base de Datos OnLine');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos')
    }
}


module.exports = {
    dbConnection
}