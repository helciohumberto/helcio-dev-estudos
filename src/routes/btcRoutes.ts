import { Router } from "express"
import WebSocket from "ws"

const router = Router()

router.get("/preco", (req, res) => {
    const precos: number[] = []
    let respondido = false
    
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade")

    ws.on("message", (data) => {
        if (respondido) return

        const trade = JSON.parse(data.toString())
        precos.push(parseFloat(trade.p))

        if (precos.length >= 5) {
            respondido = true
            ws.close()
            res.json({
                precos,
                ultimo: precos[precos.length - 1],
                minimo: Math.min(...precos),
                maximo: Math.max(...precos)
            })
        }
    })
})

export default router