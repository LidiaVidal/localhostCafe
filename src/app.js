import express from "express"
import conectaNaDatabase from "./config/dbConnect.js"
import routes from "./routes/index.js"

let conexao
try {
    conexao = await conectaNaDatabase()
    console.log('Conexão com o banco feita com sucesso!')

    conexao.on("error", (erro) => {
        console.error('Erro na conexão do banco durante o uso:', erro);
    });
} catch (erro) {
    console.error("Erro ao conectar no banco de dados:", erro.message);
}

const app = express()
routes(app)

export default app