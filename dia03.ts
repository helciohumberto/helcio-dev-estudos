import express from "express";
const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next()
});

app.get("/", (req, res) => {
    res.send("Funcionando");
});


async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url)
    const dados = await res.json();
    return dados as T;
}

app.get("/crypto/btc", async (req, res) => {
    try {
        const dados = await fetchData("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin")
        res.json(dados)
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar dados" })
    }
})

interface portfolio {
    nomeDaMoeda: string,
    quantidadeMoeda: number,
    precoDeCompra: number,
    precoAtual: number,
    dataDeCompra: Date
};

const meuPortfolio: portfolio = {
    nomeDaMoeda: "BTC",
    quantidadeMoeda: 2,
    precoDeCompra: 22000.00,
    precoAtual: 61500.50,
    dataDeCompra: new Date("2024-01-15")
}

app.get("/portfolio", async(req, res) => {
    try {
        res.json(await meuPortfolio)
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar Portfolio"})
    }
});

app.listen(3000, ()=> {
    console.log("Servidor rodando na porta 3000");
});