async function buscarDados(){
    try {
        const API = await fetch("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin&names=Bitcoin&symbols=btc/")   
        const dados = await API.json();

        Object.keys(dados).forEach(moeda => {
            const info = dados[moeda]; // Acede às informações da moeda atual
      
            console.log(`Moeda: ${moeda.toUpperCase()}`);
            console.log(`Preço em USD: $${info.usd}`);
            console.log(`Mudança em 24h: ${info.usd_24h_change}%`);
            console.log('---');
        });

        console.log(dados)
        
    } catch (error) {
        console.error(error)
    }
}

buscarDados()