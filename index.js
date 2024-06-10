const express= require('express');

const app= express();

//http://localhost:3000/
//Para responder a la / y haya una respuesta debemos:

app.get('/', (req, res)=>{
    res.send("Hola express!!!");
})

const PORT= 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));