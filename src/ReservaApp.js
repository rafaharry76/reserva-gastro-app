import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function ReservaApp() {
  const [reservas, setReservas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState(null);
  const [turno, setTurno] = useState("");
  const [comensales, setComensales] = useState(1);
  const [zona, setZona] = useState("salón");

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = () => {
    setReservas([
      {
        id: 1,
        nombre: "Carlos",
        fecha: "2025-06-05",
        turno: "Comida",
        comensales: 4,
        zona: "salón",
        telefono: "123456789",
        email: "carlos@mail.com",
      },
    ]);
  };

  const guardarReserva = () => {
    if (!nombre || !fecha || !turno) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const nueva = {
      id: Date.now(),
      nombre,
      telefono,
      email,
      fecha: format(fecha, "yyyy-MM-dd"),
      turno,
      comensales,
      zona,
    };

    setReservas([...reservas, nueva]);
    setNombre("");
    setTelefono("");
    setEmail("");
    setFecha(null);
    setTurno("");
    setComensales(1);
    setZona("salón");
  };

  const reservasFuturasOrdenadas = reservas
    .filter((r) => new Date(r.fecha) >= new Date())
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <img
        src="/logo-chariades.png"
        alt="Logo Sociedad Gastronómica Chariades"
        className="w-40 mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold mb-4">
        Reservas Sociedad Gastronómica
      </h1>
      <div className="space-y-2 mb-6 text-left">
        <input
          className="border p-2 w-full"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DatePicker
          selected={fecha}
          onChange={(date) => setFecha(date)}
          className="border p-2 w-full"
          placeholderText="Selecciona una fecha"
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
        />
        <select
          className="border p-2 w-full"
          value={turno}
          onChange={(e) => setTurno(e.target.value)}
        >
          <option value="">Selecciona turno</option>
          <option value="Comida">Comida</option>
          <option value="Cena">Cena</option>
          <option value="Día completo">Día completo</option>
        </select>
        <input
          className="border p-2 w-full"
          type="number"
          min={1}
          placeholder="Número de comensales"
          value={comensales}
          onChange={(e) => setComensales(e.target.value)}
        />
        <select
          className="border p-2 w-full"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
        >
          <option value="salón">Salón</option>
          <option value="barra">Barra</option>
          <option value="completa">Completa</option>
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={guardarReserva}
        >
          Guardar reserva
        </button>
      </div>

      <div className="space-y-4 text-left">
        {reservasFuturasOrdenadas.map((r) => (
          <div key={r.id} className="border p-4 rounded shadow">
            <p className="font-semibold">{r.nombre}</p>
            <p>
              {format(new Date(r.fecha), "dd/MM/yyyy")} - {r.turno}
            </p>
            <p>
              {r.comensales} comensales en {r.zona}
            </p>
            <p>
              📞 {r.telefono} — 📧 {r.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
