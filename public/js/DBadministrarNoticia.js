// Función para obtener datos del formulario
function obtenerDatosFormularioAlta() {

  var titulo = document.getElementById("titulo").value;
  var resumen = document.getElementById("resumen").value;
  var imagen = document.getElementById("imagen").value;
  var contenidoHtml = document.getElementById("contenidoHtml").value;
  var publicada = document.getElementById("publicada").value;
  var fechaPublicacion = document.getElementById("fechaPublicacion").value;
  var denominacionEmpresa = document.getElementById("denominacionEmpresa").value;

  var datosNoticia = {
    titulo: titulo,
    resumen: resumen,
    imagen: imagen,
    contenidoHtml: contenidoHtml,
    publicada: publicada,
    fechaPublicacion: fechaPublicacion,
    denominacionEmpresa: denominacionEmpresa,
  };

  return datosNoticia;
}

// Función para enviar datos al servidor
function altaNoticia() {

  var datos = obtenerDatosFormularioAlta();
  enviarDatosAlServidor(datos);
}

function guardarNoticia(){
        if (error) {
          throw error;
        } else {
          console.log("REGISTRO AGREGADO", results);
        }
      };

function consultarNoticia(){
        if (error) {
          throw error;
        } else {
          console.log("REGISTRO AGREGADO", results);
        }
      };

function eliminarNoticia(){
        if (error) {
          throw error;
        } else {
          console.log("REGISTRO AGREGADO", results);
        }
      };

function actualizarNoticia(){
        if (error) {
          throw error;
        } else {
          console.log("REGISTRO AGREGADO", results);
        }
      };

