import { CryptoProvider } from "./CryptoProvider";

export class CoinGeckoProvider implements CryptoProvider {
  async getPrice(symbol: string): Promise<number> {
    const resposta = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`,
    );
    const dados = (await resposta.json()) as any;
    return dados[symbol].usd;
  }
}
