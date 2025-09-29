import { useNavigate } from "react-router-dom";
export function Services() {
  const navigate = useNavigate();
  const servicios = [
    {
      id: 1,
      nombre: "Juan Pérez",
      oficio: "Plomero",
      descripcion: "Reparaciones de fugas y mantenimiento de tuberías.",
      tarifa: "$15/hora",
      imagen: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", 
    },
    {
      id: 2,
      nombre: "Ana López",
      oficio: "Diseñadora Gráfica",
      descripcion: "Creación de logos y diseño de redes sociales.",
      tarifa: "$20/hora",
      imagen: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    {
      id: 3,
      nombre: "Carlos Ruiz",
      oficio: "Profesor de Inglés",
      descripcion: "Clases particulares online y presenciales.",
      tarifa: "$10/hora",
      imagen: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    },
  ];


  return (
    <div className="container">
      <h1 className="titulo">Servicios Disponibles</h1>

      <div className="grid">
        {servicios.map((servicio) => (
          <div className="card" key={servicio.id}>
            <img className="imagen" src={servicio.imagen} alt={servicio.oficio} />
            <h2>{servicio.nombre}</h2>
            <p><strong>{servicio.oficio}</strong></p>
            <p>{servicio.descripcion}</p>
            <p style={{ color: "green", fontWeight: "bold" }}>{servicio.tarifa}</p>
            <button className="boton" onClick={() => navigate('/perfil')}>Ver más</button>
          </div>
        ))}
      </div>
    </div>
  );
}
