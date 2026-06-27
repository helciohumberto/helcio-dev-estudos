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
    const resposta = await fetch(
      "https://helcio-dev-estudos-production.up.railway.app/auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: senha }),
      },
    );
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
    <div>
      <h1>Login</h1>
      <input {...register("email")} type="email" placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}
      <input {...register("senha")} type="password" placeholder="Senha" />
      {errors.senha && <p>{errors.senha.message}</p>}
      <button onClick={handleSubmit(handleLogin)}>Entrar</button>
    </div>
  );
}

export default Login;
