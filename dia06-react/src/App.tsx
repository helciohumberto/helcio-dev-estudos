import { useState, useEffect } from 'react'
function App() {
  const [preco, setPreco] = useState<number | null>(null)
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(response => response.json())
      .then(data => setPreco(data.bitcoin.usd))
  }, [])
return (
    <div>
      <h1>Preço do BTC</h1>
      <p>{preco ? `$${preco}` : "A carregar..."}</p>
    </div>
)
}

export default App