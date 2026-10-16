import express from "express"
import ProdutoController from "../controllers/produtoController.js"

const routes = express.Router()

routes.get("/produto", ProdutoController.listarProdutos)

export default routes