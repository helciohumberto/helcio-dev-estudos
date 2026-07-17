import express from "express"
import cors from "cors"
import "dotenv/config"
import { Request, Response, NextFunction } from "express"
import authRoutes from "./routes/authRoutes"
import cryptoRoutes from "./routes/cryptoRoutes"
import { JwtUtil } from "./infrastructure/JwtUtil"
import btcRoutes from "./routes/btcRoutes"

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não está definido no .env")
}

declare global {
    namespace Express {
        interface Request {
            utilizador?: any
        }
    }
}

const app = express()
const jwtUtil = new JwtUtil()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.use("/btc", btcRoutes)

function autenticar(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ erro: "Token não fornecido" })
    }
    try {
        const payload = jwtUtil.verificarToken(token)
        req.utilizador = payload
        next()
    } catch {
        res.status(401).json({ erro: "Token inválido" })
    }
}

app.use("/", authRoutes)
app.use("/crypto", cryptoRoutes)
app.get("/protegido", autenticar, (req, res) => {
    res.json({ mensagem: "Acedeste a uma rota protegida!" })
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})