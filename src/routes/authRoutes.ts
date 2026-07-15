import { Router, Response } from "express"
import { CriarUtilizadorUseCase } from "../application/CriarUtilizadorUseCase"
import { AutenticarUseCase } from "../application/AutenticarUseCase"
import { UtilizadorRepository } from "../infrastructure/UtilizadorRepository"
import { JwtUtil } from "../infrastructure/JwtUtil"

const router = Router()
const repo = new UtilizadorRepository()
const jwtUtil = new JwtUtil()
const criarUtilizador = new CriarUtilizadorUseCase(repo)
const autenticar = new AutenticarUseCase(repo, jwtUtil)

function erroCredenciaisInvalidas(res: Response) {
    return res.status(401).json({ erro: "Credenciais inválidas" })
}

router.post("/register", async (req, res) => {
    const { email, password } = req.body
    await criarUtilizador.executar(email, password)
    res.json({ mensagem: "Utilizador criado com sucesso" })
})

router.post("/auth", async (req, res) => {
    const { email, password } = req.body
    const token = await autenticar.executar(email, password)
    if (!token) return erroCredenciaisInvalidas(res)
    res.json({ token })
})

export default router