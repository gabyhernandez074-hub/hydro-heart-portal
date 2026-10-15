import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { existeUsuario, registrarUsuario, validarContrasena } from "@/lib/db";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Registro | Monitoreo de agua" },
      { name: "description", content: "Crea tu cuenta para ver los sensores." },
      { property: "og:title", content: "Registro | Monitoreo de agua" },
      { property: "og:description", content: "Crea tu cuenta para ver los sensores." },
    ],
  }),
  component: Registro,
});

function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");

  async function registrar(e: React.FormEvent) {
    e.preventDefault();
    const problema = validarContrasena(contrasena);
    if (problema) return setError(problema);
    if (contrasena !== confirmar) return setError("Las contraseñas no coinciden.");
    if (await existeUsuario(usuario)) return setError("Ese usuario ya existe.");
    await registrarUsuario({ nombre, usuario, contrasena });
    navigate({ to: "/" });
  }

  return (
    <div className="pagina">
      <div className="cuadro">
        <form className="lado" onSubmit={registrar}>
          <h1>Registro</h1>
          <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
          <input type="password" placeholder="Confirmar contraseña" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required />
          {error && <p className="error">{error}</p>}
          <button type="submit">Registrarme</button>
          <Link to="/" className="enlace">Ya tengo cuenta</Link>
        </form>
        <div className="imagen">Espacio para tu imagen</div>
      </div>
    </div>
  );
}
