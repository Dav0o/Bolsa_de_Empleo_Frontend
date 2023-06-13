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
    <div className="add-candidate-container">
      <h2>Agregar Candidato</h2>
      <form onSubmit={handleSubmit}>
       
        <div className="form-group">
          
          <input type="text" id="nombre" name="nombre" placeholder="Nombre" value={candidate.nombre} onChange={handleChange} />
       
        </div>
        
        <div className="form-group">
          
          <input type="text" id="apellido1" name="apellido1" placeholder="Apellido1" value={candidate.apellido1} onChange={handleChange} />
         
        </div>
       
        <div className="form-group">
          
          <input type="text" id="apellido2" name="apellido2" placeholder="Apellido2" value={candidate.apellido2} onChange={handleChange} />
         
        </div>
       
        <div className="form-group">
         
          <input type="text" id="telefono" name="telefono" placeholder="Teléfono" value={candidate.telefono} onChange={handleChange} />
         
        </div>
       
        <div className="form-group">
         
          <input type="email" id="correo_electronico" name="correo_electronico" placeholder="Email" value={candidate.correo_electronico} onChange={handleChange} />
         
        </div>
       
        <div className="form-group">
          <input type="text" id="direccion" name="direccion" placeholder="Dirección" value={candidate.direccion} onChange={handleChange} />
        
        </div>
      
        <div className="form-group">
          
          <input type= "text" id="descripcion" name="descripcion" placeholder="Descripción" value={candidate.descripcion} onChange={handleChange} />
         
        </div>
        
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
}

export default AddCandidate;