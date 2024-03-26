/* INICIALIZAR PROYECTO */
/* NPM INIT -Y 
NPM INSTALL EXPRESS
NPM INSTALL NODEMON
NPM I MYSQL
NPM INSTALL PATH 

*/

const express = require('express'); /* <- ruteo backend */

const path = require("path");

const app = express();
app.use(express.urlencoded({
  extended: false
})); //Esto es para formData
app.use(express.json())

app.set('view engine', 'ejs');



app.use(express.static(path.join(__dirname, 'public')));
/* SISTEMA DE RUTEOS */
app.get("/", (req, res) => {
  res.json("funciona") /* CREAR UN HOME */
})

/* ESTO ES PARA CARGAR VISTAS */
app.get("/empresas", (req, res) => {
  res.render("administrarEmpresa.ejs");
});

app.get("/noticias", (req, res) => {
  res.render("administrarNoticia.html")
})


const puerto = 3300;
app.listen(puerto, () => {
  console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});