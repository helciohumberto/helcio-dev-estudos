import { Router } from "express"
import { CryptoProvider } from "../infrastructure/CryptoProvider"
import { CoinGeckoProvider } from "../infrastructure/CoinGeckoProvider"

const router = Router()

function criarRotaCrypto(provider: CryptoProvider) {
    router.get("/:symbol", async (req, res) => {
        const preco = await provider.getPrice(req.params.symbol)
        res.json({ symbol: req.params.symbol, preco })
    })
}

criarRotaCrypto(new CoinGeckoProvider())

export default router