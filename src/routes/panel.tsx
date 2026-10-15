import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { escucharSensores } from "@/lib/db";

export const Route = createFileRoute("/panel")({
  head: () => ({
    meta: [
      { title: "Panel | Monitoreo de agua" },
      { name: "description", content: "Gráficas en tiempo real de pH, turbidez y temperatura." },
      { property: "og:title", content: "Panel | Monitoreo de agua" },
      { property: "og:description", content: "Gráficas en tiempo real de pH, turbidez y temperatura." },
    ],
  }),
  component: Panel,
});

// Gráfica de línea muy simple hecha con SVG
function Grafica({ titulo, icono, valores, unidad }: { titulo: string; icono: string; valores: number[]; unidad: string }) {
  const max = Math.max(...valores, 1);
  const min = Math.min(...valores, 0);
  const puntos = valores
    .map((v, i) => `${(i / Math.max(valores.length - 1, 1)) * 300},${100 - ((v - min) / (max - min || 1)) * 90}`)
    .join(" ");
  return (
    <div className="grafica">
      <h2>{icono} {titulo}: {valores.at(-1) ?? "--"} {unidad}</h2>
      <svg viewBox="0 0 300 100">
        <polyline points={puntos} />
      </svg>
    </div>
  );
}

function Panel() {
  const [ph, setPh] = useState<number[]>([]);
  const [turbidez, setTurbidez] = useState<number[]>([]);
  const [temperatura, setTemperatura] = useState<number[]>([]);

  useEffect(() => {
    return escucharSensores((d) => {
      setPh((a) => [...a, d.ph].slice(-20));
      setTurbidez((a) => [...a, d.turbidez].slice(-20));
      setTemperatura((a) => [...a, d.temperatura].slice(-20));
    });
  }, []);

  return (
    <div className="pagina">
      <div className="cuadro columna">
        <Grafica titulo="pH" icono="🧪" valores={ph} unidad="" />
        <Grafica titulo="Turbidez" icono="💧" valores={turbidez} unidad="NTU" />
        <Grafica titulo="Temperatura" icono="🌡️" valores={temperatura} unidad="°C" />
      </div>
    </div>
  );
}
