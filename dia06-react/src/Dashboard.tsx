import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function buscarDados() {
      const token = localStorage.getItem("token");

      const resposta = await fetch(
        `${import.meta.env.VITE_API_URL}/protegido`,
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

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-900">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <p className="text-white text-sm">{mensagem}</p>
      <button
        className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition w-64"
        onClick={handleLogout}
      >
        Sair
      </button>
    </div>
  );
}

export default Dashboard;
