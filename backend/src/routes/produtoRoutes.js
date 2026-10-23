import express from "express"
import ProdutoController from "../controllers/produtoController.js"

const routes = express.Router()

routes.get("/produto", ProdutoController.listarProdutos)
routes.get('/produto/:id', ProdutoController.listarProdutoPorId)
routes.post('/produto', ProdutoController.criarProduto)
routes.put('/produto/:id', ProdutoController.atualizarProduto)
routes.delete('/produto/:id', ProdutoController.excluirProduto)
export default routes