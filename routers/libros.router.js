//esta carpeta permite configurar las rutas y que este todo separado para trabajar en equipo. 
const express= require("express");
const router = express.Router();
const controller= require("../controllers/libros.controllers")

router.get("/", controller.index);
//llamado a un libro unico:
router.get("/:CodLibro", controller.show);
//router.get("/", (req, res)=> {
//    res.send("Listado de libros");
//});
//CREO EL METODO PARA CREAR CONTENIDO
router.post("/", controller.store);
//para modoficar un registro
router.put("/:CodLibro", controller.update);
//router.put("")
router.delete("/:CodLibro", controller.deproy);

module.exports = router;