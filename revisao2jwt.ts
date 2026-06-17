require("dotenv-safe").config();
import express from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.method}`);
  next();
});

app.get("/", (req, res, next)=> {
  res.json({message: "Tudo ok por aqui!"});
});
app.get("/clientes", (req, res, next)=> {
  console.log("Retornou todos clientes!");
  res.json([{id: 1, nome: "Hélcio"}]);
});

app.post("/login", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  if(user === "Hélcio" && password === "123"){
    
  }
})

app.listen(process.env.PORT, ()=> console.log(`Server rodando na porta ${process.env.PORT}`));
