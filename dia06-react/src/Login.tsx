import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function fazerLogin(email: string, senha: string) {
    const resposta = await fetch("https://helcio-dev-estudos-production.up.railway.app/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: senha }),
    });
    const dados = await resposta.json();
    return dados;
  }

async function handleLogin() {
    const dados = await fazerLogin(email, senha)
    console.log(dados);

    if (!dados.token) {
        alert("Email ou senha incorretos")
        return
    }

    localStorage.setItem("token", dados.token);
    navigate("/dashboard");
}

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;