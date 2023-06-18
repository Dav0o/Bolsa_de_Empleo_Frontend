import React, { useState } from 'react';
import { getCandidatos } from "../../../services/CandidateService";
import { useQuery } from 'react-query';

function Postulate({ ofertaDescripcion, ofertaId, onClose }) {
  const { data, isLoading, isError } = useQuery("candidatos", getCandidatos, { enable: true });

  const [email, setEmail] = useState('');
  const [postulationSuccess, setPostulationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
          setPostulationSuccess(true);
          setTimeout(() => {
            onClose();
          }, 2000);
        } else {
          console.log('postulacion error');
        }
      } catch (error) {
        console.log('error post:', error);
      }
    } else {
      setErrorMessage('El correo ingresado no existe');
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
    <div className='postulate-overlay'>
      <div className='postulate'>
        <label className='oferta-nombre'>{ofertaDescripcion}</label>
        {postulationSuccess ? (
          <p>Se ha postulado con éxito!</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Email"
              className="input-email"
              value={email}
              onChange={handleChangeEmail}
            />
            <button className="btn-postular" onClick={handlePostular}>Postularse</button>
          </>
        )}
        {errorMessage && <p>{errorMessage}</p>}
        <button className="btn-cerrar" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Postulate;
