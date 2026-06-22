import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors"
const app = express();

app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

interface Utilizador {
  email: string;
  password: string;
}

const utilizadores: Utilizador[] = [];

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  utilizadores.push({ email, password: passwordHash });

  console.log(utilizadores);
  res.json({ mensagem: "Utilizador criado com sucesso" });
});

app.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  const utilizador = utilizadores.find((u) => u.email === email);

  if (!utilizador) {
    res.status(401).json({ erro: "Credenciais inválidas" });
    return;
  }

  const passwordValida = await bcrypt.compare(password, utilizador.password);

  if (!passwordValida) {
    res.status(401).json({ erro: "Credenciais inválidas" });
    return;
  }

  const token = jwt.sign({ email: utilizador.email }, "segredo123", {
    expiresIn: "1h",
  });

  res.json({ token });
});

function autenticar(req: any, res: any, next: any) {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        res.status(401).json({ erro: "Token não fornecido" })
        return
    }

    try {
        const payload = jwt.verify(token, "segredo123")
        req.utilizador = payload
        next()
    } catch {
        res.status(401).json({ erro: "Token inválido" })
    }
}

app.get("/protegido", autenticar, (req, res) => {
    res.json({ mensagem: "Acedeste a uma rota protegida!" })
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
