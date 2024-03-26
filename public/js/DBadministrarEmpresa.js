// Función para obtener datos del formulario
function obtenerDatosFormularioAlta() {

  var denominacion = document.getElementById("denominacion").value;
  var telefono = document.getElementById("telefono").value;
  var horario = document.getElementById("horario").value;
  var quienesSomos = document.getElementById("quienesSomos").value;
  var latitud = document.getElementById("latitud").value;
  var longitud = document.getElementById("longitud").value;
  var domicilio = document.getElementById("domicilio").value;
  var email = document.getElementById("email").value;

  var datosEmpresa = {
    denominacion: denominacion,
    telefono: telefono,
    horario: horario,
    quienesSomos: quienesSomos,
    latitud: latitud,
    longitud: longitud,
    domicilio: domicilio,
    email: email
  };

  return datosEmpresa;
}

// Función para enviar datos al servidor
function altaEmpresa() {

  var datos = obtenerDatosFormularioAlta();
  enviarDatosAlServidor(datos);
}


function enviarDatosAlServidor(datosEmpresa) {
  console.log('Enviando datos al servidor:', datosEmpresa);

  fetch('/guardarEmpresa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosEmpresa),
    })
    .then(response => {
      console.log('Respuesta del servidor recibida:', response);
      return response.json();
    })
    .then(data => {
      console.log('Registro agregado:', data);
    })
    .catch(error => {
      console.error('Error al agregar registro:', error);
    });
}