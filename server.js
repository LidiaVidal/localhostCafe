import 'dotenv/config';
import express from "express"
import conectaNaDatabase from "./src/config/dbConnect.js"
import { pool } from "./src/config/dbConnect.js";

const app = express()

const PORT = 3000

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


app.get('/', (req, res) => {
    res.status(200).send('Deu certo')
})

app.get('/produto', async (req, res) => {
    const resultado = await pool.query('SELECT * FROM produto')
    res.status(200).json(resultado.rows)

})

app.listen(PORT, () => {
    console.log('Servidor escutando!')
})


