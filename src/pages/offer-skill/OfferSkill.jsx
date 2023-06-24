import React, { useState } from "react";
import { useQuery } from "react-query";
import { getOfertaHabilidades } from "../../services/offerSkillService";
import "../../stylesheets/offerSkill.css";
import Postulate from "../offers/components/Postulate";

function OfferSkill() {
  const [filtroHabilidad, setFiltroHabilidad] = useState("");
  const { data, isLoading, isError } = useQuery("oferta_laboral", getOfertaHabilidades, {
      enabled: true,
    }
  );

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  if (isError) {
    return <div className="error">Error al obtener las ofertas de trabajo</div>;
  }

  const filtrarOfertasPorHabilidad = () => {
    if (filtroHabilidad === "") {
      return data;
    }

    return data.filter((ofertaHabilidad) => {
      return ofertaHabilidad.habilidadId === parseInt(filtroHabilidad);
    });
  };

  return (
    <div className="offers-container">
      <h1>Ofertas de Trabajo</h1>
      <div>
        <label htmlFor="filtroHabilidad">Filtrar por Habilidad:</label>
        <select
          id="filtroHabilidad"
          value={filtroHabilidad}
          onChange={(e) => setFiltroHabilidad(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="1">C#</option>
          <option value="2">JavaScript</option>
          <option value="3">Python</option>
          <option value="4">PhP</option>
          <option value="5">CSS</option>
          <option value="6">React</option>
          <option value="7">Node</option>
          
        </select>
      </div>
      {filtrarOfertasPorHabilidad().map((ofertaHabilidad) => (
        <div key={ofertaHabilidad.ofertaId} className="offer">
          <p>ID de oferta: {ofertaHabilidad.ofertaId}</p>
          <p>Oferta: {ofertaHabilidad.oferta}</p>
          <p>ID de habilidad: {ofertaHabilidad.habilidadId}</p>
          <p>Habilidad: {ofertaHabilidad.habilidad}</p>
        </div>
        
      ))}

    
    </div>
  );
}

export default OfferSkill;
