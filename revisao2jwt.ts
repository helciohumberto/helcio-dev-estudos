require("dotenv-safe").config();
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = parseInt(process.env.JWT_EXPIRES as string, 10);

if (!JWT_SECRET) throw new Error("JWT_SECRET não definido no .env");

const app = express();
app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Tudo ok por aqui!" });
});


app.get("/clientes", (req, res) => {
  console.log("Retornou todos clientes!");
  res.json([{ id: 1, nome: "Hélcio" }]);
});

app.post("/login", (req, res) => {
  const { user, password } = req.body;
  if (user === "Hélcio" && password === "123") {
    const id = 1;
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return res.json({ token });
  }
  res.status(401).json({ message: "Usuário ou senha inválidos!" });
});

const blacklist = {}

app.post("/logout", (req, res) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  blacklist[token] = true;
  setTimeout(()=> delete blacklist[token], parseInt(process.env.JWT_EXPIRES) * 1000);
  res.json({token: null})
})

app.listen(process.env.PORT, () =>
  console.log(`Server rodando na porta ${process.env.PORT}`)
);