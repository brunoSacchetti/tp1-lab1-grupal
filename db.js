var mysql = require('mysql')

var conexion = mysql.createConnection({
  host: 'localhost',
  database: 'lab4grupal',
  user: 'root',
  password: '',
})

conexion.connect(function (error) {
  if (error) {
    throw error
  } else {
    console.log("conexion exitosa");
  }
})

conexion.query('INSERT INTO empresa (denominacion,telefono,horarioAtencion,quienesSomos,latitud,longitud,domicilio,email) VALUES ("X","DD","DAW","DAWD",2,3,"ESPAÑA","MAXIM@GMAIL.COM")', function (error, results) {
  if (error) {
    throw error
  } else {
    console.log("REGISTRO AGREGADO", results);
  }
})

conexion.query('SELECT * from empresa', function (error, results, fields) {
  if (error)
    throw error;

  results.forEach(result => {
    console.log(result);
  });
})

conexion.end()