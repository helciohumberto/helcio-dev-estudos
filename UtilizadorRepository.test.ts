import { UtilizadorRepository } from "./UtilizadorRepository"

describe("UtilizadorRepository", () => {
    let repo: UtilizadorRepository

    beforeEach(() => {
        repo = new UtilizadorRepository()
    })

    it("deve criar um utilizador", async () => {
        await repo.criar("teste@email.com", "123456")
        const utilizador = await repo.buscarPorEmail("teste@email.com")
        expect(utilizador).toBeDefined()
        expect(utilizador?.email).toBe("teste@email.com")
    })

    it("deve retornar undefined para email que não existe", async () => {
        const utilizador = await repo.buscarPorEmail("naoexiste@email.com")
        expect(utilizador).toBeUndefined()
    })
})