import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Droplets, Thermometer, Waves } from "lucide-react";

export type Lectura = { tiempo: number; ph: number; turbidez: number; temperatura: number };
type Sensor = "temperatura" | "ph" | "turbidez";

const sensores = {
  temperatura: { titulo: "Temperatura", unidad: "°C", decimales: 1, Icono: Thermometer },
  ph: { titulo: "pH", unidad: "", decimales: 2, Icono: Droplets },
  turbidez: { titulo: "Turbidez", unidad: "NTU", decimales: 2, Icono: Waves },
};

function hora(tiempo: number) {
  return new Date(tiempo).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

// Una misma gráfica para los tres sensores: solo cambian el campo, icono y unidad.
export function GraficaSensor({ sensor, lecturas }: { sensor: Sensor; lecturas: Lectura[] }) {
  const { titulo, unidad, decimales, Icono } = sensores[sensor];
  const actual = lecturas.at(-1)?.[sensor];
  const anterior = lecturas.at(-2)?.[sensor];
  const cambio = actual !== undefined && anterior !== undefined ? actual - anterior : undefined;

  return (
    <section className={`grafica-sensor sensor-${sensor}`} aria-label={`Gráfica de ${titulo}`}>
      <header className="sensor-cabecera">
        <span className="sensor-icono"><Icono size={21} strokeWidth={1.7} aria-hidden="true" /></span>
        <div><h2>{titulo}</h2><p>Última lectura</p></div>
        <span className="sensor-estado"><span />Prueba</span>
      </header>
      <div className="sensor-lectura">
        <p><strong>{actual?.toFixed(decimales) ?? "—"}</strong><span>{unidad}</span></p>
        <span className="sensor-cambio" aria-label="Cambio desde la lectura anterior">
          {cambio === undefined ? "—" : `${cambio >= 0 ? "▲" : "▼"} ${Math.abs(cambio).toFixed(decimales)}`}
        </span>
      </div>
      <div className="sensor-trazado">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={lecturas} margin={{ top: 10, right: 4, bottom: 8, left: 0 }}>
            <defs>
              <linearGradient id={`relleno-${sensor}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--sensor-color)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--sensor-color)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--sensor-grid)" />
            <XAxis dataKey="tiempo" type="number" domain={["dataMin", "dataMax"]} tickFormatter={hora} tickLine={false} axisLine={false} minTickGap={22} tick={{ fill: "var(--sensor-muted)", fontSize: 10 }} />
            <YAxis domain={["auto", "auto"]} tickCount={5} width={46} tickLine={false} axisLine={false} tickFormatter={(valor: number) => Number(valor.toFixed(2)).toString()} tick={{ fill: "var(--sensor-muted)", fontSize: 10 }} />
            <Tooltip labelFormatter={(valor) => hora(Number(valor))} formatter={(valor: number) => [`${valor.toFixed(decimales)} ${unidad}`, titulo]} contentStyle={{ background: "var(--fondo)", borderColor: "var(--sensor-grid)", color: "var(--sensor-text)", borderRadius: 6 }} itemStyle={{ color: "var(--sensor-color)" }} />
            <Area type="monotone" dataKey={sensor} stroke="var(--sensor-color)" strokeWidth={1.8} fill={`url(#relleno-${sensor})`} dot={false} activeDot={{ r: 4 }} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}