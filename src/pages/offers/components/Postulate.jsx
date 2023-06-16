import React, { useState } from 'react';
import { getCandidatos } from "../../../services/CandidateService";
import { useQuery } from 'react-query';

function Postulate({ ofertaDescripcion, ofertaId }) {
  const { data, isLoading, isError } = useQuery("candidatos", getCandidatos, { enable: true });

  const [email, setEmail] = useState('');

  const handlePostular = async () => {

    const matchingCandidate = data.find(candidate => candidate.correo_Electronico === email);
      
    if (matchingCandidate) {
      const postPostulate = {
        candidatoId: matchingCandidate.id,
        ofertaId: ofertaId
      };

      try {
        const response = await fetch('https://localhost:7209/api/CandidatoOfertas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postPostulate)
        });
      
        if (response.ok) {
          console.log('postulacion completa')

        }
        else {
          console.log('postulacion error')
        }
      } catch (error) {
        console.log('erroor post:', error);
      }
    } else {
      console.log('Correo no encontrado');
    }

  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className='postulate'>
      <label className='oferta-nombre'>{ofertaDescripcion}</label>
      <input
        type="text"
        placeholder="Email"
        className="input-email"
        value={email}
        onChange={handleChangeEmail}
      />
      <button className="btn-postular" onClick={handlePostular}>Postularse</button>
    </div>
  );
}

export default Postulate;
