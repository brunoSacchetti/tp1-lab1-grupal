const conexion = require("./db")


conexion.query('INSERT INTO empresa (denominacion,telefono,horarioAtencion,quienesSomos,latitud,longitud,domicilio,email) VALUES ("X","DD","DAW","DAWD",2,3,"ESPAÑA","MAXIM@GMAIL.COM")', function (error, results) {
  if (error) {
    throw error;
  } else {
    console.log("REGISTRO AGREGADO", results);
  }
});

conexion.end();