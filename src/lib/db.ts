// ============================================================
// BASE DE DATOS (temporal)
// Por ahora guarda los usuarios en el navegador (localStorage).
// Cuando conectes Firebase, reemplaza estas funciones por las
// de Firebase (ver comentarios "FIREBASE").
// ============================================================

type Usuario = { nombre: string; usuario: string; contrasena: string };

function leerUsuarios(): Usuario[] {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

// FIREBASE: getDoc(doc(db, "usuarios", usuario))
export async function existeUsuario(usuario: string) {
  return leerUsuarios().some((u) => u.usuario === usuario);
}

// FIREBASE: setDoc(doc(db, "usuarios", usuario), datos)
export async function registrarUsuario(datos: Usuario) {
  const lista = leerUsuarios();
  lista.push(datos);
  localStorage.setItem("usuarios", JSON.stringify(lista));
}

// FIREBASE: leer el documento y comparar la contraseña
export async function iniciarSesion(usuario: string, contrasena: string) {
  return leerUsuarios().some((u) => u.usuario === usuario && u.contrasena === contrasena);
}

// FIREBASE: onValue(ref(db, "sensores"), (snap) => callback(snap.val()))
// Mientras tanto se generan datos de prueba cada 2 segundos.
export function escucharSensores(callback: (d: { ph: number; turbidez: number; temperatura: number }) => void) {
  const id = setInterval(() => {
    callback({
      ph: +(6.5 + Math.random() * 1.5).toFixed(2),
      turbidez: +(1 + Math.random() * 4).toFixed(2),
      temperatura: +(20 + Math.random() * 6).toFixed(1),
    });
  }, 2000);
  return () => clearInterval(id);
}

// Reglas de la contraseña:
// solo letras, números, puntos, comas y punto y coma,
// y debe tener al menos una letra, un número y un signo (. , ;)
export function validarContrasena(c: string) {
  if (!/^[A-Za-z0-9.,;]+$/.test(c)) return "Solo se permiten letras, números, puntos y comas.";
  if (!/[A-Za-z]/.test(c)) return "Debe tener al menos una letra.";
  if (!/[0-9]/.test(c)) return "Debe tener al menos un número.";
  if (!/[.,;]/.test(c)) return "Debe tener al menos un punto o una coma.";
  return "";
}
