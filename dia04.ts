import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não está definido no .env")
}

const JWT_SECRET = process.env.JWT_SECRET

declare global {
  namespace Express {
    interface Request {
      utilizador?: any;
    }
  }
}

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

function erroCredenciaisInvalidas(res: Response) {
  return res.status(401).json({ erro: "Credenciais inválidas" });
}

interface Utilizador {
  email: string;
  password: string;
}

const utilizadores: Utilizador[] = [];
async function criarUtilizador(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    utilizadores.push({ email, password: passwordHash });
}
app.post("/register", async (req, res) => {
  const {email, password} = req.body;
  await criarUtilizador(email, password);
  console.log(utilizadores);
  res.json({ mensagem: "Utilizador criado com sucesso" });
});

app.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const utilizador = utilizadores.find((u) => u.email === email);
  if (!utilizador) {
    return erroCredenciaisInvalidas(res);
  }
  const passwordValida = await bcrypt.compare(password, utilizador.password);
  if (!passwordValida) {
    return erroCredenciaisInvalidas(res);
  }
  const token = jwt.sign({ email: utilizador.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

function autenticar(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return erroCredenciaisInvalidas(res);
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.utilizador = payload;
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido" });
  }
}

app.get("/protegido", autenticar, (req, res) => {
  res.json({ mensagem: "Acedeste a uma rota protegida!" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
