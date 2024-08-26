function initGoogleApi() {
    gapi.load('client:auth2', function() {
      gapi.client.init({
        'clientId': '950546624673-dveq9hdgmcpd0uil3r276pg2bjpjfeuh.apps.googleusercontent.com',
        'clientSecret': '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',
        'scope': 'https://www.googleapis.com/auth/gmail.send'
      }).then(function() {
        // La API de Google está lista para ser utilizada
        document.getElementById('contact-form').addEventListener('submit', sendEmail);
      });
    });
  }

  function sendEmail(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Obtén los datos del formulario
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Construye el correo electrónico
    var email = {
      'raw': btoa(`To: bilisebas123@gmail.com\r\n` +
                  `Subject: Nuevo mensaje del formulario de contacto\r\n\r\n` +
                  `Nombre: ${name}\r\n` +
                  `Email: ${email}\r\n` +
                  `Mensaje: ${message}`)
    };

    // Envía el correo electrónico
    gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': email
    }).then(function(response) {
      console.log('Correo enviado correctamente');
    }, function(error) {
      console.error('Error al enviar el correo:', error);
    });
  }

  gapi.load('client', initGoogleApi);
