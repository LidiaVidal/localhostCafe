import express from "express"
import cors from "cors"
import produto from "./produtoRoutes.js"
import categoria from "./categoriaRoutes.js"

const routes = (app) => {
    app.route('/').get((req, res) => res.status(200).send('Deu certo'))
    app.use(cors(), express.json(), produto, categoria)
}

export default routes