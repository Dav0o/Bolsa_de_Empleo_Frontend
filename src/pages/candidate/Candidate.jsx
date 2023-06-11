import React from "react";
import { Link, useParams } from "react-router-dom";
import { useCandidateData } from "../../services/hooks/useCandidateData";
import AddStudies from "./components/AddStudies";
import "../../stylesheets/Candidate.css";

function Candidate() {
  const { candidateId } = useParams();
  const { isLoading, data, isError, error } = useCandidateData(candidateId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div className="candidate-container">
        <div className="candidate-data">
          <div className="candidate-information">
            <div className="candidate-personal-data">
              <span> {data?.data.nombre}</span>
              <span>{data?.data.correo_Electronico}</span>
              <span className="candidate-text-description">{data?.data.descripcion}</span>
            </div>
            <div className="candidate-habilidades">
              {data?.data.candidatoHabilidades.map((habilidades) => (
                <span key={habilidades.candidatoId}>
                  <button>{habilidades.habilidadId}</button>
                </span>
              ))}
            </div>
          </div>
          <div className="candidate-studies">
            
            <AddStudies />
          </div>
        </div>

        <div className="candidate-table-studies">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Titulo</th>
                <th>TiempoEmpleado</th>
                <th>Fecha Culminacion</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.formaciones.map((formation) => (
                <tr key={formation.id}>
                  <td>{formation.id}</td>
                  <td>{formation.titulo}</td>
                  <td>{formation.tiempo_Empleado}</td>
                  <td>{formation.fecha_Culminacion}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="btn-actions-offers">
          <Link to={`/offers`}> <button>Ver ofertas</button> </Link> 
          <button>Ver ofertas por habilidad</button>
          <button> Ver mis postulaciones</button>
        </div>
      </div>
    </>
  );
}

export default Candidate;
