import React from "react";
import { Link, useParams } from "react-router-dom";
import { deleteCandidate, getByIdCandidate } from "../../services/CandidateService";
import AddStudies from "./components/AddStudies";
import "../../stylesheets/Candidate.css";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

function Candidate() {
  const { candidateId } = useParams();
  const { isLoading, data, isError } = useQuery(['candidato', candidateId], () => getByIdCandidate(candidateId));

  const deleteCantidateMutation = useMutation()

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{Error}</h2>;
  }

  const deleteHandler = (id, e) => {
    e.preventDefault();
    axios
      .delete(`https://localhost:7209/api/Formaciones_Academicas/${id}`)
      .then((res) => console.log("Deleted", res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="candidate-container">
      <div className="candidate-box">
        <div className="candidate-border-box">
          <div className="candidate-data">
            <div className="candidate-information">
              <div className="candidate-personal-data">
                <span> {data.nombre}</span>
                <span>{data.correo_Electronico}</span>
                <span className="candidate-text-description">
                  {data.descripcion}
                </span>
              </div>
              <div className="candidate-habilidades">
                {data.candidatoHabilidades.map((habilidades) => (
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.formaciones.map((formation) => (
                  <tr key={formation.id}>
                    <td>{formation.id}</td>
                    <td>{formation.titulo}</td>
                    <td>{formation.tiempo_Empleado}</td>
                    <td>{formation.fecha_Culminacion}</td>
                    <td>
                      <button
                        className="btn-delete"
                       
                      >
                        {" "}
                        <span className="material-symbols-outlined">
                          delete
                        </span>{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="btn-actions-offers">
            <Link to={`/offers`}>
              {" "}
              <button>Ver ofertas</button>{" "}
            </Link>
            <Link to={`/offer-skill`}>
              <button>Ver ofertas por habilidad</button>
            </Link>

            <button> Ver mis postulaciones</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Candidate;
