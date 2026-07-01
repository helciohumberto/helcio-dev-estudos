import { useState, useEffect } from "react";

function useFetch<T>(url: string) {
  const [dados, setDados] = useState<T | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function buscarDados() {
      try {
        setCarregando(true);
        const token = localStorage.getItem("token");

        const resposta = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await resposta.json();
        setDados(json);
      } catch (e) {
        setErro("Erro ao buscar dados");
      } finally {
        setCarregando(false);
      }
    }

    buscarDados();
  }, [url]);
  
  return { dados, carregando, erro }
}

export default useFetch;
