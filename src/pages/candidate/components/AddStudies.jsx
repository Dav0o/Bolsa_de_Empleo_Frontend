import React, { useRef } from "react";
import { useMutation } from "react-query";
import { create } from '../../../services/FormationService'
import { useParams } from "react-router-dom";
import "../../../stylesheets/Candidate.css"

function AddStudies() {
    const { candidateId } = useParams()

    const formationTitle = useRef(null);
    const formationTiempo = useRef(null);
    const formacionCulminacion = useRef(null);

    const mutation = useMutation('formaciones_academicas', create)

    const handleSave = () => {

        let newFormation = {
            titulo:formationTitle.current.value,
            tiempo_Empleado:formationTiempo.current.value,
            fecha_Culminacion:formacionCulminacion.current.value,
            candidatoId:parseInt(candidateId) 
            

        };
        mutation.mutateAsync(newFormation);
    }

  return (
    <>
    <span>Formacion Academica</span>
    <div className="candidate-studies">

      <input 
      ref={formationTitle}
      type="text" 
      placeholder="Titulo" 
      className="input-title" 
      />

      <input
        ref={formationTiempo}
        type="text"
        placeholder="Tiempo empleado"
        className="input-empleado"
      />
      <input
        ref={formacionCulminacion}
        type="text"
        placeholder="Tiempo culminacion"
        className="input-culminacion"
      />
      <button className="btn-save" onClick={handleSave}>Save</button>
    </div>
    </>
  );
}

export default AddStudies;
