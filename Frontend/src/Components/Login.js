import React, { useState } from "react";
import { api, setToken } from "../api/api";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    // Implement API endpoint for login in backend
    try {
      const { data } = await api.post("/auth/login", user);
      setToken(data.token);
      window.location.href = "/";
    } catch (err) {
      setError("Login failed");
    }
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <input
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={e => setUser({ ...user, username: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>
      {error && <div style={{color:"red"}}>{error}</div>}
    </form>
  );
}

export default Login;
