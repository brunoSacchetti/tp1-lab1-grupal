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

app.get('/noticias', (req, res) => {
  // Consulta SQL para obtener las frutas de la base de datos
  const sql = 'SELECT denominacion FROM empresa';

  // Ejecutar la consulta SQL
  conexion.query(sql, (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error interno del servidor');
      return;
    }
    
    // Renderizar el formulario con los resultados de la consulta
    res.render('administrarNoticia.ejs', { denominacionEmpresa: resultados });
  });
});



const puerto = 3300;
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});