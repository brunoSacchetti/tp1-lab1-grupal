// Función para obtener datos del formulario
function obtenerDatosFormularioAlta() {

  let titulo = document.getElementById("titulo").value;
  let resumen = document.getElementById("resumen").value;
  let imagen = document.getElementById("imagen").value;
  let editorHtml = tinymce.get("editorHtml").getContent();
  let publicada = document.querySelector('input[name="publicada_bool"]:checked').value === 'true' ? 'y' : 'n'; // Asignar 'y' si está publicada, 'n' si no lo está
  let fechaPublicacion = document.getElementById("fechaPublicacion").value;
  //var denominacionEmpresaElement = document.getElementById("denominacionEmpresa");
  //var denominacionEmpresa = denominacionEmpresaElement.options[denominacionEmpresaElement.selectedIndex].value;
  // Variable para almacenar el ID de la empresa seleccionada
  const selectElement = document.getElementById("denominacionEmpresa");
  //selectIndex devuelve el índice de la opción seleccionada actualmente en el elemento <select>. 
  //.options  accede a la lista de opciones dentro del elemento <select>.
  const selectedOption = selectElement.options[selectElement.selectedIndex]; 
  const idEmpresa = selectedOption.dataset.id; //obtiene el valor del atributo data-id de la opción seleccionada y lo almacena en la variable idEmpresa.

  let datosNoticia = {
    titulo: titulo,
    resumen: resumen,
    imagen: imagen,
    editorHtml: editorHtml,
    publicada: publicada,
    fechaPublicacion: fechaPublicacion,
    idEmpresa: idEmpresa,
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


