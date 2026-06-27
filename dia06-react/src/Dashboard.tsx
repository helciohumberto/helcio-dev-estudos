import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    async function buscarDados() {
      const token = localStorage.getItem("token");

      const resposta = await fetch(
        "https://helcio-dev-estudos-production.up.railway.app/protegido",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const dados = await resposta.json();
      setMensagem(dados.mensagem);
    }

    buscarDados();
  }, []);

  function handleLogout(){
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{mensagem}</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Dashboard;
