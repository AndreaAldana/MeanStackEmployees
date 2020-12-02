const express = require('express');
const morgan = require('morgan')
const app = express();
const mongooose = require('mongoose');
const cors = require('cors')


// Settings
var port = process.env.PORT || 3900;


// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}))

// Routes
app.use('/api/employees' ,require('./routes/employee.routes'))

// Starting server
mongooose.connect('mongodb+srv://AndreaAldana:Paralelepipedo_98@cluster0.gamk7.mongodb.net/MeanEmployees?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
            console.log('La conexion a mongodb se realizo correctamente!');

            //Crear servidor y ponerme a escuchar peticiones HTTP
            app.listen(port, () => {
                    console.log('Servidor corriendo en http://localhost:' + port);

            });

    });