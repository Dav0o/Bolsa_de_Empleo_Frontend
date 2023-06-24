import React, { useState } from 'react';
import '../../stylesheets/AddCandidate.css'

function AddCandidate() {
  const [candidate, setCandidate] = useState({
    nombre: '',
    apellido1: '',
    apellido2: '',
    telefono: '',
    correo_electronico: '',
    direccion: '',
    descripcion: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch('https://localhost:7209/api/Candidatos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidate),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      // Reset form fields after successful submission
      setCandidate({
        nombre: '',
        apellido1: '',
        apellido2: '',
        telefono: '',
        correo_electronico: '',
        direccion: '',
        descripcion: ''
      });

      setSuccessMessage('¡Registrado éxitosamente!');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setCandidate({ ...candidate, [event.target.name]: event.target.value });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

    if (successMessage) {
      return <div>{successMessage}</div>;
  }

  return (
<div className='add-candidate-container'> 
  <h2>
    Agregar Candidato
  </h2> 
  <form onSubmit={handleSubmit}>
<div className='form'>
  <div className="form-group">
    <input className="name-input" type="text" name="nombre" value={candidate.nombre} onChange={handleChange} required />  
    <label className='name-label'>Nombre</label>
  </div>
  
  <div className="form-group">  
    <input className="lastName-input" type="text" name="apellido1" value={candidate.apellido1} onChange={handleChange} required />
    <label className='lastName-label'>Primer apellido</label>
  </div>

  <div className="form-group">  
    <input className="lastName-input" type="text" name="apellido2" value={candidate.apellido2} onChange={handleChange} required />
    <label className='lastName-label'>Segundo apellido</label>
  </div>

  <div className="form-group">  
    <input className="telefono-input" type="text" name="telefono" value={candidate.telefono} onChange={handleChange} required />
    <label className='telefono-label'>Teléfono</label>
  </div>

  <div className="form-group">  
    <input className="correo_electronico-input" type="email" name="correo_electronico" value={candidate.correo_electronico} onChange={handleChange} required />
    <label className='correo_electronico-label'>Email</label>
  </div>

  <div className="form-group">  
    <input className="direccion-input" type="text" name="direccion" value={candidate.direccion} onChange={handleChange} required />
    <label className='direccion-label'>Dirección</label>
  </div>
        
  <div className="form-group">  
    <input className="descripcion-input" type="text" name="descripcion" value={candidate.descripcion} onChange={handleChange} required />
    <label className='descripcion-label'>Descripción</label>
  </div>
        <button type="submit" className="submit-button">Save</button>
    </div>
      </form>
    </div>
  );
}

export default AddCandidate;