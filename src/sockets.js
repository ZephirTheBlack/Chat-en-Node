module.exports = (io) => {
  let nickNames = [];

  io.on("connection", socket => {
    console.log("nuevo usuario conectado");

    // Al recibir un mensaje recogemos los datos:
    socket.on("enviar mensaje", (datos) => {
      //console.log(datos);

      io.sockets.emit("nuevo mensaje", {
        msg: datos,
        nick: socket.nickname
      });
    });

    socket.on("nuevo usuario", (datos, callback) => {
      if (nickNames.indexOf(datos) != -1) {
        callback(false);
      } else {
        callback(true);
        socket.nickname = datos;
        nickNames.push(socket.nickname);

        io.sockets.emit("usernames", nickNames);
      }
    });

    socket.on("disconnect", (datos) => {
      if (!socket.nickname) {
        return;
      } else {
        nickNames.splice(nickNames.indexOf(socket.nickname), 1);
        io.sockets.emit("usernames", nickNames);
      }
    });
  });
};
