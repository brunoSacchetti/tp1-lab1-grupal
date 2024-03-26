// Función para obtener datos del formulario
function obtenerDatosFormularioAlta() {

  let titulo = document.getElementById("titulo").value;
  let resumen = document.getElementById("resumen").value;
  let imagen = document.getElementById("imagen").value;
  let editorHtml = tinymce.get("editorHtml").getContent();
  let publicada = document.querySelector('input[id="si"]:checked').value === 'true' ? 'y' : 'n'; // Asignar 'y' si está publicada, 'n' si no lo está
  let fechaPublicacion = document.getElementById("fechaPublicacion").value;
  var denominacionEmpresaElement = document.getElementById("denominacionEmpresa");
  var denominacionEmpresa = denominacionEmpresaElement.options[denominacionEmpresaElement.selectedIndex].value;

  let datosNoticia = {
    titulo: titulo,
    resumen: resumen,
    imagen: imagen,
    editorHtml: editorHtml,
    publicada: publicada,
    fechaPublicacion: fechaPublicacion,
    denominacionEmpresa: denominacionEmpresa,
  };

  return datosNoticia;
}

// Función para enviar datos al servidor
function altaNoticia(event) {
  event.preventDefault();
  console.log("Estoy en alta noticia");
  var datos = obtenerDatosFormularioAlta();
  subidaDatosADb(datos);
}

/*function bajaEmpresa() {
  const idEmpresa = document.getElementById("id_baja").value;
  enviarDatosBajaAlServidor(idEmpresa);
  return false;
}*/

function subidaDatosADb(datosNoticia) {
  console.log('Enviando datos al servidor:', datosNoticia);

  fetch('/guardarNoticia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosNoticia),
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

/*function enviarDatosBajaAlServidor(idEmpresa) {
  fetch('/eliminarEmpresa', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: idEmpresa
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Empresa eliminada:', data);
    })
    .catch(error => {
      console.error('Error al eliminar empresa:', error);
    });
}*/


