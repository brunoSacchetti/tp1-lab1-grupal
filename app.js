/* INICIALIZAR PROYECTO */
/* NPM INIT -Y 
NPM INSTALL EXPRESS
NPM INSTALL NODEMON
NPM I MYSQL
NPM INSTALL PATH 
*/

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


const express = require('express'); /* <- ruteo backend */

const path = require("path");

const app = express();
app.use(express.urlencoded({
  extended: false
})); //Esto es para formData
app.use(express.json())

app.set('view engine', 'ejs');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
/* SISTEMA DE RUTEOS */
app.get("/", (req, res) => {
  res.json("funciona") /* CREAR UN HOME */
})

/* ESTO ES PARA CARGAR VISTAS */
app.get("/empresas", (req, res) => {
  res.render("administrarEmpresa.ejs");
});

app.post('/guardarEmpresa', (req, res) => {
  const datosEmpresa = req.body;
  const sql = "INSERT INTO empresa (denominacion, telefono, horarioAtencion, quienesSomos, latitud, longitud, domicilio, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  conexion.query(sql, [datosEmpresa.denominacion, datosEmpresa.telefono, datosEmpresa.horario, datosEmpresa.quienesSomos, datosEmpresa.latitud, datosEmpresa.longitud, datosEmpresa.domicilio, datosEmpresa.email], function (error, results) {
    if (error) {
      res.status(500).json({
        error: 'Error al agregar registro a la base de datos'
      });
    } else {
      res.json({
        message: 'Registro agregado correctamente'
      });
    }
  });
});

app.delete('/eliminarEmpresa', (req, res) => {
  const idEmpresa = req.body.id;
  const sql = "DELETE FROM empresa WHERE id = ?";
  
  conexion.query(sql, [idEmpresa], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al eliminar empresa de la base de datos' });
    } else {
      res.json({ message: 'Empresa eliminada correctamente' });
    }
  });
});

app.get("/noticias", (req, res) => {
  res.render("administrarNoticia.html")
})


const puerto = 3300;
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});