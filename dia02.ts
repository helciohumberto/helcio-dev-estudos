  //-----------BTC FETCHER-----------

import fetch from "node-fetch";

//-------MEU PORTFOLIO-------------

interface moedas {
  usd: number;
  usd_24h_change: number;
}

interface dados {
  [moeda: string]: moedas;
}

interface portfolio {
    nomeDaMoeda: string;
    quantidadeMoeda: number;
    precoDeCompra: number;
    precoAtual: number;
    dataDeCompra: Date;
};
const meuPortfolio: portfolio = {
    nomeDaMoeda: "BTC",
    quantidadeMoeda: 2,
    precoDeCompra: 22000.00,
    precoAtual: 61500.50,
    dataDeCompra: new Date("2024-01-15")
};
console.log(meuPortfolio)

async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url)
    const dados = await res.json();
    return dados as T;
}
async function main() {
    const resultado = await fetchData<dados>("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin")
    console.log(resultado)
}

main()



async function buscarDados() {
  try {
    const API = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin&names=Bitcoin&symbols=btc",
    );
    const dados = (await API.json()) as dados;

    Object.keys(dados).forEach((moeda) => {
      const info = dados[moeda];

      if (!info) return;

      console.log(`Moeda: ${moeda.toUpperCase()}`);
      console.log(`Preço em USD: $${info.usd}`);
      console.log("---");
    });

    console.log(dados);
  } catch (error) {
    console.error(error);
  }
}

buscarDados();

// ---------------------------------------------------------------

// Cap 1. JavaScript Eloquent

for (let i = 1; i <= 7; i++) {
  console.log("$btc".repeat(i));
}

for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log(i + " FizzBuzz");
  } else if (i % 3 === 0) {
    console.log(i + " Fizz");
  } else if (i % 5 === 0) {
    console.log(i + " Buzz");
  } else {
    console.log(i);
  }
}
