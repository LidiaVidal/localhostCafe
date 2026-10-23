import { pool } from "../config/dbConnect.js"

class CategoriaController {
    static async listarCategorias (req, res) {
        try {
            const query = 'SELECT * FROM categoria'
            const resultado = await pool.query(query)
            res.status(200).json(resultado.rows)
        } catch (erro) {
            console.error("Erro ao listar categorias:", erro.message);
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    static async listarCategoriaPorId (req, res) {
        try {
            const id = req.params.id
            const query = `SELECT * FROM categoria WHERE id= $1`
            const resultado = await pool.query(query, [id])
            if (resultado.rows.length === 0) {
                return res.status(404).json({ message: "Categoria não encontrada." });
            }
            res.status(200).json(resultado.rows[0]);
        } catch (erro) {
            console.error("Erro ao listar categoria:", erro.message);
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    static async criarCategoria(req, res) {
        try {
            const dados = req.body
            if(Object.keys(dados).length === 0) {
                return res.status(400).json({ message: "Nenhum dado foi fornecido para cadastro."})
            }

            const colunas = Object.keys(dados).join(', ')
            const valores = Object.values(dados)
            const placeholders = valores.map((_, index) => `$${index + 1}`).join(', ')

            const query = `INSERT INTO categoria (${colunas}) VALUES (${placeholders}) RETURNING *`

            const resultado = await pool.query(query, valores)
            const categoriaCriada = resultado.rows[0]

            res.status(201).json(categoriaCriada)
        } catch (erro) {
            console.error("Erro ao criar categoria:", erro.message);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    }

    static async atualizarCategoria(req, res) {
        try {
            const id = req.params.id
            const dadosAtualizar = req.body
            const chaves = Object.keys(dadosAtualizar);  

            if(chaves.length == 0) {
                return res.status(400).json({message: "Nenhum campo fornecido para atualização"})
            }

            const setClause = chaves
                    .map((chave, index) => `${chave} = $${index + 1}`)
                    .join(", ");
            const valores = Object.values(dadosAtualizar)
            valores.push(id)
            const query = `UPDATE categoria SET ${setClause} WHERE id = $${valores.length} RETURNING *`

            const resultado = await pool.query(query, valores)

            if(resultado.rowCount == 0) {
                return res.status(404).json({ message: "Categoria não encontrada." })
            }

            const categoriaAtualizada = resultado.rows[0];
            res.status(200).json(categoriaAtualizada)
        } catch (erro) {
            console.error("Erro ao atualizar categoria:", erro.message);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    }

    static async excluirCategoria(req, res) {
        try {
            const id = req.params.id
            const query = `DELETE FROM categoria where id = $1`

            const resultado = await pool.query(query, [id])

            if (resultado.rowCount === 0) {
                return res.status(404).json({message: "Categoria não encontrada!"})
            }

            res.status(200).json({message: "Categoria excluída com sucesso!"})  

        } catch (erro) {
            if (erro.code === '23503') {
                return res.status(409).json({ message: "Não é possível excluir: existem produtos vinculados a esta categoria." });
            }
            console.error("Erro ao deletar a categoria:", erro.message);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    }

}

export default CategoriaController