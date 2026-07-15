import { UtilizadorRepository } from "../infrastructure/UtilizadorRepository"

export class CriarUtilizadorUseCase {
    constructor(private repo: UtilizadorRepository) {}

    async executar(email: string, password: string): Promise<void> {
        await this.repo.criar(email, password)
    }
}