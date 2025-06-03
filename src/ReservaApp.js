import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function ReservaApp() {
  const [reservas, setReservas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    setReservas([
      { id: 1, nombre: "Carlos", fecha: "2025-06-05", hora: "14:30" },
      { id: 2, nombre: "Rafa", fecha: "2025-06-06", hora: "21:00" }
    ]);
  };

  const guardarReserva = async () => {
    if (!nombre || !fecha || !hora) return alert("Todos los campos son obligatorios.");
    const nueva = { id: Date.now(), nombre, fecha, hora };
    setReservas([...reservas, nueva]);
    setNombre("");
    setFecha("");
    setHora("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reservas Sociedad Gastronómica</h1>
      <div className="space-y-2 mb-6">
        <input className="border p-2 w-full" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input className="border p-2 w-full" type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
        <input className="border p-2 w-full" type="time" value={hora} onChange={e => setHora(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={guardarReserva}>Guardar reserva</button>
      </div>
      <div className="space-y-4">
        {reservas.map(r => (
          <div key={r.id} className="border p-4 rounded shadow">
            <p className="font-semibold">{r.nombre}</p>
            <p>{format(new Date(r.fecha), 'dd/MM/yyyy')} a las {r.hora}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
