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

    static async listarProdutoPorId(req, res) {
        try {
            const id = req.params.id
            const query = `SELECT * FROM produto WHERE id = $1`
            const resultado = await pool.query(query, [id])

            if (resultado.rows.length === 0) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }
            res.status(200).json(resultado.rows[0])
        } catch (erro) {
            console.error("Erro ao listar produto:", erro.message);
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    static async criarProduto(req, res) {
        try {
            const dados = req.body
            if(Object.keys(dados).length === 0) {
                return res.status(400).json({ message: "Nenhum dado foi fornecido para cadastro."})
            }

            const categoriaEncontrada = await pool.query(
                'SELECT * FROM categoria WHERE id = $1', 
                [dados.categoria_id]
            );

            if (categoriaEncontrada.rowCount === 0) {
                return res.status(404).json({ message: "Categoria não encontrada" });
            }

            const colunas = Object.keys(dados).join(', ')
            const valores = Object.values(dados)
            const placeholders = valores.map((_, index)  => `$${index + 1}`).join(', ')

            const query = `INSERT INTO produto (${colunas}) VALUES (${placeholders}) RETURNING *`
            const resultado = await pool.query(query, valores)
            const produtoCriado = resultado.rows[0]

            res.status(201).json(produtoCriado)
        } catch (erro) {
            console.error("Erro ao criar produto:", erro.message);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    }

    static async atualizarProduto(req, res) {
        try {
            const id = req.params.id;
            const dados = req.body;

            if (dados.categoria_id) {
                const categoriaEncontrada = await pool.query(
                    'SELECT id FROM categoria WHERE id = $1', 
                    [dados.categoria_id]
                );
                if (categoriaEncontrada.rowCount === 0) {
                    return res.status(404).json({ message: "A categoria informada não existe." });
                }
            }

            //Define estritamente quais colunas podem ser atualizadas (Proteção contra injeção)
            const camposPermitidos = ['categoria_id', 'nome', 'descricao', 'preco', 'url_imagem', 'ativo'];
            const camposAtualizar = [];
            const valores = [];
            let contador = 1;

            camposPermitidos.forEach(campo => {
                if (dados[campo] !== undefined) {
                    camposAtualizar.push(`${campo} = $${contador}`);
                    valores.push(dados[campo]);
                    contador++;
                }
            });

            if (camposAtualizar.length === 0) {
                return res.status(400).json({ message: "Nenhum dado válido foi fornecido para atualizar." });
            }

            valores.push(id);
            const query = `UPDATE produto SET ${camposAtualizar.join(", ")} WHERE id = $${contador} RETURNING *`;

            const resultado = await pool.query(query, valores);

            if (resultado.rowCount === 0) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }

            res.status(200).json(resultado.rows[0]);

        } catch (erro) {
            console.error("Erro ao atualizar produto:", erro.message);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    }

    static async excluirProduto(req, res) {
        try {
            const id = req.params.id
            const query = `DELETE FROM produto WHERE id = $1`
            const resultado = await pool.query(query, [id])

            if (resultado.rowCount === 0) {
                return res.status(404).json({message: "Produto não encontrado!"})
            }
            
            res.status(200).json({message: "Produto excluído com sucesso!"})
        } catch (erro) {
        
            console.error("Erro ao deletar produto:", erro.message);
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    }
}

export default ProdutoController