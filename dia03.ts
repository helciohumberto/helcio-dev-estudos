import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Funcionando");
});


async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url)
    const dados = await res.json();
    return dados as T;
}

app.get("/crypto/btc", async (req, res) => {
    res.json(await fetchData("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin"))
});

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
    res.json(await meuPortfolio)
});

app.listen(3000, ()=> {
    console.log("Servidor rodando na porta 3000");
});