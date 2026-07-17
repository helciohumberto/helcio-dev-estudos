import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import BtcChart from "./BtcChart";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/btc" element={<BtcChart />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
