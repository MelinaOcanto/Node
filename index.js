const express= require('express');
const app= express();

app.use(express.json());
// ruta no absoluta app.use(express.static("public"));

//podemos usar la ruta absoluta//esta ruta es para que me devuelva archivos públicos
const path = require("path"); 
app.use(express.static(path.join(__dirname, "public")));

//esta ruta es para que me permita ver los archivos de la carpeta privada
//asocio una ruta nueva, solicito esa ruta, declaro la constante y se la paso abajo con app.use
const librosRouter=require("./routers/libros.router")
//uso la ruta nueva
app.use("/libros", librosRouter);
//tambien se puede hacer :
app.use("/libros", require ("./routers/libros.router"));
//http://localhost:3000/
//Para responder a la / y haya una respuesta debemos:

app.get('/', (req, res)=>{
    res.send("Hola express!!!");
})

app.get('/factura', (req, res)=>{
    res.sendFile(path.join(__dirname, 'private', 'factura.html'))
})
//para que me devuelva todo el json
app.get('/listado', (req, res)=> {
    res.sendFile(path.join(__dirname, 'listado.json'))
})
//Para que me devuelva solo una parte, un elemento del json
app.get('/listado/:titulo', (req, res)=>{
    console.log(req.params.titulo);
    res.send('Una pelicula');
})


const PORT= 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));