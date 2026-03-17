// termo para importar recursos que estão fora deste arquivo
// const express = require('express') //CommonJS
import express from 'express'; // ESModule
import cors from 'cors';
import leadsRoutes from './routes/leads.routes.js';


// CONSTRUÇÃO E CONFIGURAÇÃO BÁSICA DO SERVIDOR EXPRESS
const app = express()
const port = 3000
app.use(express.json())
app.use(cors()); // API pública - Aceita requisições de qualquer Origem
// Access-Control-Allow-Origin: *


app.get("/", (req, res) => {
    res.json({ result: 'Hello World!' })
})
app.use(leadsRoutes)


// ENTRYPOINT
// AQUI é o que faz a API estar no ar!
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});