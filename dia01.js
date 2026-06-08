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


// ---------------------------------------------------------------

// Cap 1. JavaScript Eloquent

for(let i=1; i <= 7; i++){
    console.log("#".repeat(i))
}


for(let i=1; i <= 100; i++){
    if(i % 3 === 0 && i % 5 === 0){
        console.log(i + " FizzBuzz")
    } else if(i % 3 === 0){
        console.log(i + " Fizz")
    } else if(i % 5 === 0){
        console.log(i + " Buzz")
    } else {
        console.log(i)
    }
}


