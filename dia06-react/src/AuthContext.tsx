import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  token: string | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)
export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

    function logout() {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth precisa ser usado dentro de um AuthProvider")
    }
    return context
}
