import React, { useState } from 'react';
import { getCandidatos } from "../../../services/CandidateService";
import { useQuery } from 'react-query';

function Postulate({ ofertaDescripcion, ofertaId }) {
  const { data, isLoading, isError } = useQuery("candidatos", getCandidatos, { enable: true });
  const [successMessage, setSuccessMessage] = useState('');
  const [postulate, setPostulate] = useState(
    {
      "candidatoId": null,
      "ofertaId": null
    }
  );

  const handleSubmit = async (event) => {
     event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch('https://localhost:7209/api/CandidatoOfertas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postulate),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      // Reset form fields after successful submission
      setPostulate({
        "candidatoId": null,
        "ofertaId": null
      });

      setSuccessMessage('¡Registrado éxitosamente!');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [email, setEmail] = useState('');

const handlePostular = () => {
      
      const matchingCandidate = data.find(candidate => candidate.correo_Electronico === email);
      
    if (matchingCandidate) {
        console.log('Correo encontrado:', matchingCandidate.correo_Electronico);
        console.log('ID:', matchingCandidate.id)
        console.log('IdOferta', ofertaId)
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
