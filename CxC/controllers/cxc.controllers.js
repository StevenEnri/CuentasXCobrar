const {db} = require('../cnn')

const getCxC = async (req, res) => {
    const response = await db.any('SELECT * FROM cuentasBancarias')
    res.json(response)
}

const insertCxC = async (req, res) => {
    const {idCB, nombreCB, entidadCB, descripcionCB, estadoCB} = req.query
    const response = await db.any('INSERT into cuentasBancarias(idCB, nombreCB, entidadCB, descripcionCB, estadoCB) values($1, $2, $3, $4, $5);', [idCB, nombreCB, entidadCB, descripcionCB, estadoCB])
    res.json ({
        message: "Cuenta por Cobrar Ingresada",
        body:{
          cuentasBancarias:{idCB, nombreCB, entidadCB, descripcionCB, estadoCB}
        }
    })
}

const updateCxC = async (req, res) => {
    const { idCB, nombreCB, entidadCB, descripcionCB, estadoCB } = req.query;
  
    try {
      const query = `
        UPDATE cuentasBancarias
        SET nombreCB = $1, entidadCB = $2, descripcionCB = $3, estadoCB = $4
        WHERE idCB = $5
        RETURNING idCB, nombreCB, entidadCB, descripcionCB, estadoCB
      `;
  
      const result = await db.one(query, [nombreCB, entidadCB, descripcionCB, estadoCB, idCB]);
  
      res.json({
        message: "Cuenta por Cobrar actualizada",
        body: {
          cuentaPorCobrar: result
        }
      });
    } catch (error) {
      console.error("Error al actualizar la Cuenta por Cobrar:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
  const deleteCxC = async (req, res) => {
    const { idCB } = req.query;
    try {
        const response = await db.query('DELETE FROM cuentasBancarias WHERE idCB = $1', [idCB]);
        res.json({
            message: "Cuenta por Cobrar eliminada",
            body: {
                Cuenta: {
                  idCB
                }
            }
        });
    } catch (error) {
        console.error("Error al eliminar la cuenta por cobrar:", error);
        res.status(500).json({
            message: "Error al eliminar la cuenta por cobrar"
        });
    }
};


module.exports = {
    getCxC, insertCxC, updateCxC, deleteCxC
}