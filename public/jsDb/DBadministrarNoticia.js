// Función para obtener datos del formulario
function obtenerDatosFormularioAlta() {

  let titulo = document.getElementById("titulo").value;
  let resumen = document.getElementById("resumen").value;
  let imagen = document.getElementById("imagen").value;
  let editorHtml = tinymce.get("editorHtml").getContent();
  let publicada = document.querySelector('input[name="publicada_bool"]:checked').value === 'true' ? 'y' : 'n'; // Asignar 'y' si está publicada, 'n' si no lo está
  let fechaPublicacion = document.getElementById("fechaPublicacion").value;
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

function limpiarCamposNoticia() {
  document.getElementById("titulo").value = "";
  document.getElementById("resumen").value = "";
  document.getElementById("imagen").value = "";
  tinymce.get("editorHtml").setContent(""); // Limpiar contenido del editor HTML
  document.getElementById("si").checked = true; // Establecer opción "Si" por defecto
  document.getElementById("fechaPublicacion").value = "";
}

// Función para enviar datos al servidor
function altaNoticia(event) {
  event.preventDefault();
  console.log("Estoy en alta noticia");
  var datos = obtenerDatosFormularioAlta();
  subidaDatosADb(datos);
}

function eliminarNoticia() {
  const idNoticia = document.getElementById("id_noticia").value;
  enviarDatosBajaAlServidor(idNoticia);
  return false;
}

 function enviarDatosBajaAlServidor(idNoticia) {
   fetch('/eliminarNoticia', {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       id: idNoticia
     }),
   })
   .then(response => response.json())
   .then(data => {
     console.log('Noticia eliminada:', data);
   })
   .catch(error => {
     console.error('Error al eliminar noticia:', error);
   });
}


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
      limpiarCamposNoticia();
    })
    .catch(error => {
      console.error('Error al agregar registro:', error);
    });
}

//MOSTRAR LISTADO DE NOTICIAS
function consultarNoticias() {
  console.log("Mostrando noticias");
  fetch('/consultarNoticias')
    .then(response => response.json())
    .then(data => {
      const noticias = data.noticias;
      const tbody = document.querySelector('#tablaNoticias tbody');
      tbody.innerHTML = ''; // Limpiar el contenido actual de la tabla

      noticias.forEach(noticia => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${noticia.id}</td>
          <td>${noticia.titulo}</td>
          <td>${noticia.resumen}</td>
          <td>${noticia.publicada}</td>
          <td>${noticia.fechaPublicacion}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error al consultar las noticias:', error);
    });
}




