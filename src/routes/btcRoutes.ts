import { Router } from "express"
import WebSocket from "ws"
import { CacheService } from "../infrastructure/CacheService"

const router = Router()
const cache = new CacheService()

router.get("/preco", async (req, res) => {
    const cacheKey = "btc:preco"
    
    // Verifica se existe cache
    const cached = await cache.get(cacheKey)
    if (cached) {
        console.log("Cache hit!")
        return res.json(JSON.parse(cached))
    }

    console.log("Cache miss — buscando da Binance...")
    
    const precos: number[] = []
    let respondido = false

    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade")

    ws.on("message", async (data) => {
        if (respondido) return

        const trade = JSON.parse(data.toString())
        precos.push(parseFloat(trade.p))

        if (precos.length >= 5) {
            respondido = true
            ws.close()

            const resultado = {
                precos,
                ultimo: precos[precos.length - 1],
                minimo: Math.min(...precos),
                maximo: Math.max(...precos)
            }

            // Guarda no cache por 60 segundos
            await cache.set(cacheKey, JSON.stringify(resultado), 60)
            
            res.json(resultado)
        }
    })
})

export default router