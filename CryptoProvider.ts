export interface CryptoProvider {
    getPrice(symbol: string): Promise<number>
}