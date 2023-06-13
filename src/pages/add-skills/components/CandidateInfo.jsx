import React from "react";
import { useParams } from "react-router-dom";
import { useCandidateData } from "../../../services/hooks/useCandidateData";

function CandidateInfo() {
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
      <h3> {data?.data.nombre} {data?.data.apellido1}</h3>
      <span>{data?.data.correo_Electronico}</span>
      <span className="candidate-text-description">
        {data?.data.descripcion}
      </span>
    </>
  );
}

export default CandidateInfo;
