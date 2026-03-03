import { useState } from "react";

function Login({ setIsAdmin }) {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setIsAdmin(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        Login Administrador
      </h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Usuario"
        onChange={e =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        type="password"
        className="w-full border p-2 mb-3"
        placeholder="Contraseña"
        onChange={e =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-900 text-white p-2 rounded"
      >
        Ingresar
      </button>
    </div>
  );
}

export default Login;