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

app.use('/css', express.static(path.join(__dirname, 'css')));

app.use('/js', express.static(path.join(__dirname, 'js')));

app.use(express.static(path.join(__dirname, 'public')));


/* SISTEMA DE RUTEOS */

app.get("/", (req, res) => {
  const sql = 'SELECT id, denominacion FROM empresa';
  conexion.query(sql, (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Renderizar el formulario con los resultados de la consulta
    res.render('index.ejs', {
      empresas: resultados
    });
  });
})

/* ESTO ES PARA CARGAR VISTAS */
app.get("/empresas", (req, res) => {
  res.render("administrarEmpresa.ejs");
});

// GUARDAR EMPRESA
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

//GUARDAR NOTICIA
app.post('/guardarNoticia', (req, res) => {
  const datosNoticia = req.body;
  const sql = "INSERT INTO noticia (titulo, resumen, imagen, contenidoHtml, publicada, fechaPublicacion, idEmpresa) VALUES (?, ?, ?, ?, ?, ?, ?)";

  //ARREGLAR datosNoticia.denominacionEmpresa
  conexion.query(sql, [datosNoticia.titulo, datosNoticia.resumen, datosNoticia.imagen, datosNoticia.editorHtml, datosNoticia.publicada, datosNoticia.fechaPublicacion, datosNoticia.idEmpresa], function (error, results) {
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

//-------------ELIMINAR EMPRESA
app.delete('/eliminarEmpresa', (req, res) => {
  const idEmpresa = req.body.id;
  const sql = "DELETE FROM empresa WHERE id = ?";

  conexion.query(sql, [idEmpresa], (error, results) => {
    if (error) {
      res.status(500).json({
        error: 'Error al eliminar empresa de la base de datos'
      });
    } else {
      res.json({
        message: 'Empresa eliminada correctamente'
      });
    }
  });
});


//----------ELIMINAR NOTICIA
app.delete('/eliminarNoticia', (req, res) => {
  const idNoticia = req.body.id;
  const sql = "DELETE FROM noticia WHERE id = ?";

  conexion.query(sql, [idNoticia], (error, results) => {
    if (error) {
      res.status(500).json({
        error: 'Error al eliminar noticia de la base de datos'
      });
    } else {
      res.json({
        message: 'Noticia eliminada correctamente'
      });
    }
  });
});


//-------------OBTENER DENOMINACION DE EMPRESA
app.get('/noticias', (req, res) => {
  // Consulta SQL para obtener las frutas de la base de datos
  const sql = 'SELECT id, denominacion FROM empresa';

  // Ejecutar la consulta SQL
  conexion.query(sql, (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Renderizar el formulario con los resultados de la consulta
    res.render('administrarNoticia.ejs', {
      denominacionEmpresa: resultados
    });
  });
});

//----------CONSULTAR TODAS LAS NOTICIAS
app.get('/consultarNoticias', (req, res) => {
  // Consulta SQL para obtener las noticias de la base de datos
  const sql = 'SELECT id, titulo, resumen, publicada, fechaPublicacion FROM noticia';

  // Ejecutar la consulta SQL
  conexion.query(sql, (error, resultados) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Enviar los resultados como respuesta JSON
    res.json({
      noticias: resultados
    });
  });
});

app.get('/home/:id', function (req, res) {
  const idEmpresa = req.params.id;

  // Consulta SQL para obtener la información de la empresa
  const sqlEmpresa = 'SELECT id, denominacion FROM empresa WHERE id = ?';

  // Consulta SQL para obtener las noticias de la empresa específica
  const sqlNoticias = 'SELECT id, titulo, resumen, publicada, fechaPublicacion FROM noticia WHERE idEmpresa = ?';

  // Ejecutar la consulta SQL para obtener la información de la empresa
  conexion.query(sqlEmpresa, [idEmpresa], (errorEmpresa, resultadosEmpresa) => {
    if (errorEmpresa) {
      console.error('Error al ejecutar la consulta de empresa:', errorEmpresa);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Verificar si se encontró la empresa
    if (resultadosEmpresa.length === 0) {
      res.status(404).send('Empresa no encontrada');
      return;
    }

    // Obtener la información de la empresa
    const empresa = resultadosEmpresa[0];

    // Ejecutar la consulta SQL para obtener las noticias de la empresa
    conexion.query(sqlNoticias, [idEmpresa], (errorNoticias, resultadosNoticias) => {
      if (errorNoticias) {
        console.error('Error al ejecutar la consulta de noticias:', errorNoticias);
        res.status(500).send('Error interno del servidor');
        return;
      }

      // Renderizar la vista home.ejs con los datos de la empresa y las noticias
      res.render('home.ejs', {
        empresa: empresa,
        noticias: resultadosNoticias
      });
    });
  });
});
//------------------
const puerto = 3300;
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});