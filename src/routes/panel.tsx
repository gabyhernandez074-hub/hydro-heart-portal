import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { escucharSensores } from "@/lib/db";
import { GraficaSensor, type Lectura } from "@/components/grafica-sensor";

export const Route = createFileRoute("/panel")({
  head: () => ({
    meta: [
      { title: "Panel | Monitoreo de agua" },
      { name: "description", content: "Gráficas en tiempo real de pH, turbidez y temperatura." },
      { property: "og:title", content: "Panel | Monitoreo de agua" },
      { property: "og:description", content: "Gráficas en tiempo real de pH, turbidez y temperatura." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Panel,
});

function Panel() {
  const [lecturas, setLecturas] = useState<Lectura[]>([]);

  useEffect(() => {
    // Historial de ejemplo; no representa mediciones reales de Firebase.
    const ahora = Date.now();
    setLecturas(Array.from({ length: 40 }, (_, i) => ({
      tiempo: ahora - (40 - i) * 2000,
      temperatura: +(24 + Math.sin(i * 1.7) * 0.7 - i * 0.035).toFixed(1),
      ph: +(7 + Math.sin(i * 1.3) * 0.16 + i * 0.012).toFixed(2),
      turbidez: +(3 + Math.sin(i * 1.8) * 0.65 - i * 0.028).toFixed(2),
    })));
    // Cada actualización añade un punto con su hora real y conserva 40 lecturas.
    return escucharSensores((d) => {
      setLecturas((anteriores) => [...anteriores, { ...d, tiempo: Date.now() }].slice(-40));
    });
  }, []);

  return (
    <main className="pagina panel-sensores">
      <div className="panel-contenido">
        <p className="panel-aviso">Datos de prueba · Firebase pendiente de conexión</p>
        <div className="panel-graficas">
          <GraficaSensor sensor="temperatura" lecturas={lecturas} />
          <GraficaSensor sensor="ph" lecturas={lecturas} />
          <GraficaSensor sensor="turbidez" lecturas={lecturas} />
        </div>
      </div>
    </main>
  );
}
