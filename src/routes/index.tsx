import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { iniciarSesion } from "@/lib/db";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión | Monitoreo de agua" },
      { name: "description", content: "Ingresa para ver pH, turbidez y temperatura en tiempo real." },
      { property: "og:title", content: "Iniciar sesión | Monitoreo de agua" },
      { property: "og:description", content: "Ingresa para ver pH, turbidez y temperatura en tiempo real." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    if (await iniciarSesion(usuario, contrasena)) navigate({ to: "/panel" });
    else setError("Usuario o contraseña incorrectos.");
  }

  return (
    <div className="pagina">
      <div className="cuadro">
        <form className="lado" onSubmit={entrar}>
          <h1>Iniciar sesión</h1>
          <input placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
          {error && <p className="error">{error}</p>}
          <button type="submit">Entrar</button>
          <Link to="/registro" className="enlace">¿No tienes cuenta? Regístrate</Link>
        </form>
        <div className="imagen">Espacio para tu imagen</div>
      </div>
    </div>
  );
}
