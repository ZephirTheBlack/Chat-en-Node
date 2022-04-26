$(function () {
  const socket = io();
  var nick = "";

  const messageFrom = $("#messages-form");
  const messageBox = $("#message");
  const chat = $("#chat");

  const nickFrom = $("#nick-form");
  const nickName = $("#nick-name");
  const nickError = $("#nick-error");

  const userNames = $("#usernames");

  //enviar mensajes al servidor
  messageFrom.submit((e) => {
    e.preventDefault();
    socket.emit("enviar mensaje", messageBox.val());
    messageBox.val("");
  });

  //obtenemos respuesta del servidor

  socket.on("nuevo mensaje", function (datos) {
    //console.log(datos);

    let color = "#f4f4f4";
    if (nick == datos.nick) {
      color = "#9ff4c5";
    }

    chat.append(
      `<div class="msg-area mb-2 d-flex" style="background-color: ${color}"><p class="msg"><b>${datos.nick} :</b>${datos.msg}</p></div>`
    );

  });

  //nuevo usuario

  nickFrom.submit((e) => {
    e.preventDefault();
    console.log('Enviando...');
    socket.emit("nuevo usuario", nickName.val(), (datos) => {
      if (datos) {
        nick = nickName.val();
        $("#nick-wrap").hide();
        $("#content-wrap").show();
      } else {
        nickError.html(
          '<div class="alert alert-danger">El usuario ya existe</div>'
        );
      }
      nickName.val('');
    });
  });

  //obtenemos el array de usuarios conectados

  socket.on("usernames", (datos) => {
    let html = "";
    let color = "#000";
    let salir = "";
    console.log(nick);
    for (let i = 0; i < datos.length; i++) {
      if (nick == datos[i]) {
        color = "#027f43";
        salir = '<a class="enlace-salir" href="/"><i class="fas fa-sign-out-alt salir"></i></a>';
      } else {
        color = "#000";
        salir = "";
      }
      html += `<p style ="color: ${color}"><i class="fas fa-user"></i>${datos[i]} ${salir}</p>`;
    }

    userNames.html(html);
  });
});
