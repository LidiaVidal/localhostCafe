import express from "express";
import { pool } from "./config/dbConnect.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

// Teste rápido de conexão com o PostgreSQL na inicialização
pool.query("SELECT 1")
    .then(() => console.log("Conexão com o PostgreSQL realizada com sucesso!"))
    .catch((erro) => console.error("Erro ao conectar no PostgreSQL:", erro.message));

routes(app);

export default app;