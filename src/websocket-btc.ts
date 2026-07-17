import WebSocket from "ws"

const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade")

ws.on("message", (data) => {
    const trade = JSON.parse(data.toString())
    console.log(`BTC: $${trade.p}`)
})