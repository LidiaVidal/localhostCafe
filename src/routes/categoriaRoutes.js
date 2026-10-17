import express from "express"
import CategoriaController from "../controllers/categoriaController.js"

const routes = express.Router()

routes.get('/categoria', CategoriaController.listarCategorias)

export default routes