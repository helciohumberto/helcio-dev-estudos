process.env.JWT_SECRET = "segredo-de-teste"
import request from "supertest"
import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"


// Cria uma app de teste sem o listen
const app = express()
app.use(cors())
app.use(express.json())
app.use("/", authRoutes)

describe("Auth API", () => {
    it("deve registar um utilizador", async () => {
        const resposta = await request(app)
            .post("/register")
            .send({ email: "teste@email.com", password: "123456" })

        expect(resposta.status).toBe(200)
        expect(resposta.body.mensagem).toBe("Utilizador criado com sucesso")
    })

    it("deve fazer login com credenciais correctas", async () => {
        // Primeiro regista
        await request(app)
            .post("/register")
            .send({ email: "login@email.com", password: "123456" })

        // Depois faz login
        const resposta = await request(app)
            .post("/auth")
            .send({ email: "login@email.com", password: "123456" })

        expect(resposta.status).toBe(200)
        expect(resposta.body.token).toBeDefined()
    })

    it("deve rejeitar login com senha errada", async () => {
        await request(app)
            .post("/register")
            .send({ email: "erro@email.com", password: "123456" })

        const resposta = await request(app)
            .post("/auth")
            .send({ email: "erro@email.com", password: "senhaerrada" })

        expect(resposta.status).toBe(401)
    })
})