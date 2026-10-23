import express from "express"
import CategoriaController from "../controllers/categoriaController.js"

const routes = express.Router()

routes.get('/categoria', CategoriaController.listarCategorias)
routes.get('/categoria/:id', CategoriaController.listarCategoriaPorId)
routes.post('/categoria', CategoriaController.criarCategoria)
routes.put('/categoria/:id', CategoriaController.atualizarCategoria)
routes.delete('/categoria/:id', CategoriaController.excluirCategoria)
export default routes