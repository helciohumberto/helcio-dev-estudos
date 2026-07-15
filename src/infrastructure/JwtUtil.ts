import jwt from "jsonwebtoken"

export class JwtUtil {
    private secret: string

    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET não está definido")
        }
        this.secret = process.env.JWT_SECRET
    }

    gerarToken(email: string): string {
        return jwt.sign({ email }, this.secret, { expiresIn: "1h" })
    }

    verificarToken(token: string): any {
        return jwt.verify(token, this.secret)
    }

    extrairEmail(token: string): string {
        const payload = this.verificarToken(token) as any
        return payload.email
    }
}