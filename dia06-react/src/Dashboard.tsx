import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import useFetch from "./useFetch";

interface DashboardData {
  mensagem: string;
}

function Dashboard() {
  const { dados, carregando, erro } = useFetch<DashboardData>(
    `${import.meta.env.VITE_API_URL}/protegido`,
  );
  const { logout } = useAuth();
  const navigate = useNavigate();

  function sair() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-900">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      {carregando && <p className="text-gray-400">Carregando...</p>}
      {erro && <p className="text-red-400">{erro}</p>}
      {dados && <p className="text-white text-sm">{dados.mensagem}</p>}
      <button
        className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition w-64"
        onClick={sair}
      >
        Sair
      </button>
    </div>
  );
}

export default Dashboard;
