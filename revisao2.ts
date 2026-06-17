import express from 'express';
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken';

const app = express();
app.use(express.json())

app.use((req, res, next)=>{
  console.log(`${req.method} ${req.url}`)
  next()
})

interface Usuario {
  nome: string;
  idade: number;
}

const utilizador: Usuario[] = [];

app.post("/registrar", async(req, res) => {
  const {nome, idade} = req.body;
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"))
