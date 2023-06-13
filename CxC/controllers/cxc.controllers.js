const {db} = require('../cnn')

const getCxC = async (req, res) => {
    const response = await db.any('SELECT * FROM CUENTASBANCARIAS')
    res.json(response)
}

const insertCxC = async (req, res) => {
    const {codigo, nombrecuentabancaria, entidadbancaria, descripcion, estado} = req.query
    const response = await db.any('INSERT into CUENTASBANCARIAS(codigo, nombrecuentabancaria, entidadbancaria, descripcion, estado) values($1, $2, $3, $4, $5);', [codigo, nombrecuentabancaria, entidadbancaria, descripcion, estado])
    res.json ({
        message: "Cuenta por Cobrar Ingresada",
        body:{
            CUENTASBANCARIAS:{codigo, nombrecuentabancaria, entidadbancaria, descripcion, estado}
        }
    })
}

const updateCxC = async (req, res) => {
    const { codigo, nombrecuentabancaria, entidadbancaria, descripcion, estado } = req.query;
  
    try {
      const query = `
        UPDATE CUENTASBANCARIAS
        SET nombrecuentabancaria = $1, entidadbancaria = $2, descripcion = $3, estado = $4
        WHERE codigo = $5
        RETURNING codigo, nombrecuentabancaria, entidadbancaria, descripcion, estado
      `;
  
      const result = await db.one(query, [nombrecuentabancaria, entidadbancaria, descripcion, estado, codigo]);
  
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
    const { codigo } = req.query;
    try {
        const response = await db.query('DELETE FROM CUENTASBANCARIAS WHERE codigo = $1', [codigo]);
        res.json({
            message: "Cuenta por Cobrar eliminada",
            body: {
                Cuenta: {
                    codigo
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