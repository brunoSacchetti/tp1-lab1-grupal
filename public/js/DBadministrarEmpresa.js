const conexion = require("./db")
/* 'INSERT INTO empresa (denominacion,telefono,horarioAtencion,quienesSomos,latitud,longitud,domicilio,email) VALUES ("X","DD","DAW","DAWD",2,3,"ESPAÑA","MAXIM@GMAIL.COM" */

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

function altaEmpresa() {

  var datos = obtenerDatosFormularioAlta();

  guardarEmpresa(datos);
}

function guardarEmpresa(datosEmpresa) {

  var sql = "INSERT INTO empresa (denominacion, telefono, horarioAtencion, quienesSomos, latitud, longitud, domicilio, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";


  conexion.query(sql, [datosEmpresa.denominacion, datosEmpresa.telefono, datosEmpresa.horario, datosEmpresa.quienesSomos, datosEmpresa.latitud, datosEmpresa.longitud, datosEmpresa.domicilio, datosEmpresa.email], function (error, results) {
    if (error) {
      throw error;
    } else {
      console.log("REGISTRO AGREGADO", results);
    }
  });
}

function consultarEmpresa() {
  if (error) {
    throw error;
  } else {
    console.log("REGISTRO AGREGADO", results);
  }
};

function eliminarEmpresa() {
  if (error) {
    throw error;
  } else {
    console.log("REGISTRO AGREGADO", results);
  }
};

function actualizar() {
  if (error) {
    throw error;
  } else {
    console.log("REGISTRO AGREGADO", results);
  }
};


conexion.end();