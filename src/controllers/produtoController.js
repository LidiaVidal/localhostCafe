import { pool } from "../config/dbConnect.js"

class ProdutoController {
    static async listarProdutos (req, res) {
        try {
            const resultado = await pool.query('SELECT * FROM produto')
            res.status(200).json(resultado.rows)
        } catch (erro) {
            console.error("Erro ao listar produtos:", erro.message);
            res.status(500).json({ mensagem: "Erro interno no servidor" });
        }
    }
}

export default ProdutoController