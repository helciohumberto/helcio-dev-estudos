import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface PrecoBtc {
    precos: number[]
    ultimo: number
    minimo: number
    maximo: number
}

function BtcChart() {
    const [dados, setDados] = useState<PrecoBtc | null>(null)
    const [historico, setHistorico] = useState<{ preco: number }[]>([])

    useEffect(() => {
        const intervalo = setInterval(async () => {
            try {
                const resposta = await fetch(`${import.meta.env.VITE_API_URL}/btc/preco`)
                const json = await resposta.json() as PrecoBtc
                setDados(json)
                setHistorico(prev => [...prev.slice(-20), { preco: json.ultimo }])
            } catch (e) {
                console.error("Erro ao buscar preço", e)
            }
        }, 3000)

        return () => clearInterval(intervalo)
    }, [])

    if (!dados) return <p className="text-white">A carregar preço do BTC...</p>

    return (
        <div className="flex flex-col items-center gap-4 p-8 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-white">BTC / USD</h1>
            <p className="text-4xl font-bold text-yellow-400">${dados.ultimo.toLocaleString()}</p>
            <div className="flex gap-8 text-sm">
                <span className="text-green-400">Máx: ${dados.maximo.toLocaleString()}</span>
                <span className="text-red-400">Mín: ${dados.minimo.toLocaleString()}</span>
            </div>
            <div className="w-full max-w-2xl h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historico}>
                        <XAxis dataKey="index" hide />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                        <Line type="monotone" dataKey="preco" stroke="#f5a623" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BtcChart