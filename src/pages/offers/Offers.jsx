import React, { useState } from "react";
import { useQuery } from "react-query";
import { getOfertas } from "../../services/OffersService";
import "../../stylesheets/Offers.css";
import Postulate from "./components/Postulate";

function Offers() {
  const { data, isLoading, isError } = useQuery("ofertas", getOfertas, {
    enabled: true,
  });

  const [selectedOffer, setSelectedOffer] = useState(null)
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const handlePostulateClick = (ofertaDescripcion, ofertaId) => {
    setSelectedOffer(ofertaDescripcion);
    setSelectedOfferId(ofertaId);
  };

  return (
    <>
      <div className="master">
      <div className="container">
        {data.map((ofertas) => (
          <div className="card-ofertas" key={ofertas.id}>
            <div className="card-title">
              <h1>{ofertas.descripcion_Puesto}</h1>
              <span>dd/mm/yyyy</span>
            </div>
            <div className="card-body">
              <h3>Empresa Prueba</h3>
              <span>
                {ofertas.descripcion_Puesto} con {ofertas.experiencia_Necesaria}{" "}
                de experiencia
              </span>
            </div>
            <div className="card-footer">
              <div className="card-footer-skills">
                {ofertas.ofertaHabilidades.map((skills) => (
                  <button>{skills.habilidadId}</button>
                ))}
              </div>
              <div className="card-footer-btn">
                <button onClick={()=>handlePostulateClick(ofertas.descripcion_Puesto, ofertas.id)}>Postularse</button>
              </div>
            </div>
          </div>
        ))}      
        </div>
        {setSelectedOffer && <Postulate ofertaDescripcion={selectedOffer} ofertaId={selectedOfferId}/>}
      </div>  
    </>
  );
}

export default Offers;
