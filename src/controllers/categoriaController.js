import { pool } from "../config/dbConnect.js"

class CategoriaController {
    static async listarCategorias (req, res) {
        try {
            const query = 'SELECT * FROM categoria'
            const resultado = await pool.query(query)
            res.status(200).json(resultado.rows)
        } catch (erro) {
            console.error("Erro ao listar categorias:", erro.message);
            res.status(500).json({ mensagem: "Erro interno no servidor" });
        }
    }
}

export default CategoriaController