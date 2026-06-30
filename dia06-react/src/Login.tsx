import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  async function fazerLogin(email: string, senha: string) {
    const resposta = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: senha }),
    });
    const dados = await resposta.json();
    return dados;
  }

  async function handleLogin(dadosForm: { email: string; senha: string }) {
    const dados = await fazerLogin(dadosForm.email, dadosForm.senha);
    console.log(dados);

    if (!dados.token) {
      alert("Email ou senha incorretos");
      return;
    }

    localStorage.setItem("token", dados.token);
    navigate("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-900">
      <h1 className="text-3xl font-bold text-white">Login</h1>
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500 w-64"
      />{" "}
      {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
      <input
        {...register("senha")}
        type="password"
        placeholder="Senha"
        className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500 w-64"
      />
      {errors.senha && <p className="text-red-400 text-sm">{errors.senha.message}</p>}
      <button
        onClick={handleSubmit(handleLogin)}
        className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition w-64"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
