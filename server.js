import express from "express"

const app = express()

const PORT = 3000

app.get('/', (req, res) => {
    res.status(200).send('Deu certo')
})

app.listen(PORT, () => {
    console.log('Servidor escutando! em ')
})


