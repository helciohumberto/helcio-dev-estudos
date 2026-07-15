import { UtilizadorRepository } from "../infrastructure/UtilizadorRepository"
import { JwtUtil } from "../infrastructure/JwtUtil"
import bcrypt from "bcryptjs"

export class AutenticarUseCase {
    constructor(
        private repo: UtilizadorRepository,
        private jwtUtil: JwtUtil
    ) {}

    async executar(email: string, password: string): Promise<string | null> {
        const utilizador = await this.repo.buscarPorEmail(email)
        if (!utilizador) return null

        const passwordValida = await bcrypt.compare(password, utilizador.password)
        if (!passwordValida) return null

        return this.jwtUtil.gerarToken(email)
    }
}