import express from "express"
const app = express()

app.use(express.json())

// middlewares
app.use((req, res, next) =>{
    console.log(`${req.method} ${req.url}`)
    next()
})

interface pessoa {
    nome: string;
    idade: number;
    nascimento: number;
    email: string;
}

async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url)
    const dados = await res.json()
    return dados as T
}

// rotas
    app.get("/", (req, res)=>{
        res.send(fetchData)
    })
// listen
app.listen(3000, ()=> {
    console.log("Servidor rodando na porta 3000")
})