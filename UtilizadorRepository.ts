import bcrypt from "bcryptjs";

interface Utilizador {
  email: string;
  password: string;
}

export class UtilizadorRepository {
  private utilizadores: Utilizador[] = [];

  async criar(email: string, password: string): Promise<void> {
    const passwordHash = await bcrypt.hash(password, 10);
    this.utilizadores.push({ email, password: passwordHash });
  }

  async buscarPorEmail(email: string): Promise<Utilizador | undefined> {
    return this.utilizadores.find((u) => u.email === email);
  }
}
