import React, { useState } from 'react';

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
        <br />
        <div className="form-group">
          <label htmlFor="nombre">Nombre: </label>
          <input type="text" id="nombre" name="nombre" value={candidate.nombre} onChange={handleChange} />
          <br />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="apellido1">Apellido1:</label>
          <input type="text" id="apellido1" name="apellido1" value={candidate.apellido1} onChange={handleChange} />
          <br />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="apellido2">Apellido2:</label>
          <input type="text" id="apellido2" name="apellido2" value={candidate.apellido2} onChange={handleChange} />
          <br />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input type="text" id="telefono" name="telefono" value={candidate.telefono} onChange={handleChange} />
          <br />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="correo_electronico">Correo:</label>
          <input type="email" id="correo_electronico" name="correo_electronico" value={candidate.correo_electronico} onChange={handleChange} />
          <br />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input type="text" id="direccion" name="direccion" value={candidate.direccion} onChange={handleChange} />
          <br />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input type= "text" id="descripcion" name="descripcion" value={candidate.descripcion} onChange={handleChange} />
          <br />
        </div>
        <br />
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
}

export default AddCandidate;