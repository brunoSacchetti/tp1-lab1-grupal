const mysql = require('mysql');

// Crear la conexión a la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',
  database: 'lab4grupal',
  user: 'root',
  password: '',
});

// Conectar a la base de datos
conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("conexion exitosa");
  }
});

// Exportar la conexión para que esté disponible en otros archivos
module.exports = conexion;