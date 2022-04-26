const express = require('express');
const path = require('path');
const app = express();

const server = require('http').Server(app);
const socketio = require('socket.io')(server);

app.set('port',process.env.PORT || 3000);

//Ejecutamos la funcion de socket.js
require('./sockets')(socketio);

//Archivos estaticos:
app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), ()=> {
    console.log('Escuchando en el puerto ',app.get('port'));
});