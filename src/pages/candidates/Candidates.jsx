import React from "react";
import { useQuery } from "react-query";
import { getCandidatos } from "../../services/CandidateService";
import { Link } from "react-router-dom";
import "../../stylesheets/Candidates.css";

function Candidates() {
  const { data, isLoading, isError } = useQuery("candidatos", getCandidatos, {enabled: true, });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="tabla-candidatos">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((candidato) => (
              <tr key={candidato.id}>
                <td>{candidato.id}</td>
                <td>{candidato.nombre}</td>
                <td>{candidato.correo_Electronico}</td>
                <td>
                  <button className="titulos">
                    <Link className="titulos" to={`/candidate/${candidato.id}`}>
                      <span className="material-symbols-outlined">edit</span>
                    </Link>
                  </button>

                  <button className="habilidades">
                    <Link className='habilidades' to={`/add-skills/${candidato.id}`}>
                      <span className="material-symbols-outlined">dataset</span>
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*    <div className='list-candidatos'>
            {
                data.map((candidato) =>(
                  <div className='div-candidato' key={candidato.id}>
                    <Link to={`/candidate/${candidato.id}`}>{candidato.nombre}</Link>
                  </div> 
                  
                ))
            }
            </div> */}
    </>
  );
}

export default Candidates;
