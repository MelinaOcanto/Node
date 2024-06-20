//requiero la conexion a la base de datos
const db=require("../db/db");

const index = (req,res) => {
    const sql='select * from libro'
    db.query(sql, (error,rows)=>{
        console.log(rows)
        if(error){
            throw error;
        }
        res.json(rows)
    });

    
}
const show = (req, res)=>{
    const {CodLibro} = req.params;
    const sql='select * from libro where CodLibro = ?'
    db.query(sql, [CodLibro], (error,rows)=>{
        //console.log(rows)
        if(error){
            throw error;
        }
       
        if (rows.length === 0){
            return res.status(404).json({message: 'No existe ese codigo de libro'})
        }
        res.json(rows)
    });

}

const store = (req, res)=>{
    const {CodLibro, Titulo, ISBN, Editorial, AEscritura, AEdicion} = req.body;
    const sql='INSERT INTO libro(CodLibro, Titulo, ISBN, Editorial, AEscritura, AEdicion) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [CodLibro, Titulo, ISBN, Editorial, AEscritura, AEdicion], (error,result)=>{
        console.log(result);
        if (error) {
        console.log(error);
        return res.status(500).json({error: "Intente mas tarde"}); 
    }
       
    res.json({id: CodLibro});
    });

};

const update = (req, res) => {
    const { CodLibro } = req.params; 
    const { Titulo, ISBN, Editorial, AEscritura, AEdicion } = req.body;

    // Comprobación básica de los datos
    if (!CodLibro || !Titulo || !ISBN || !Editorial || !AEscritura || !AEdicion) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const sql = 'UPDATE libro SET Titulo = ?, ISBN = ?, Editorial = ?, AEscritura = ?, AEdicion = ? WHERE CodLibro = ?';
    
    db.query(sql, [Titulo, ISBN, Editorial, AEscritura, AEdicion, CodLibro], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Intente más tarde" }); 
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró ningún libro para actualizar" });
        }

        const libro = { CodLibro, Titulo, ISBN, Editorial, AEscritura, AEdicion };

        res.json(libro);
    });
};

const deproy = (req, res) => {
    const {CodLibro} = req.params;
    const sql = "DELETE from libro WHERE CodLibro = ?";
    
    db.query(sql, [CodLibro], (error, result) => {
        console.log(result);
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Intente más tarde" }); 
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró ningún libro para actualizar" });
        }

        

        res.json({message: "Registro eliminado"});
    });
};



module.exports = {
    index,
    show,
    store, 
    update,
    deproy
};