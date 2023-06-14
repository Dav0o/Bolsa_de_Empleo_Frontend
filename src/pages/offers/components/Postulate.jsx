import React from 'react'

function Postulate({ ofertaDescripcion }) {
    
/*     const { data, isLoading, isError } = useQuery("candidatos", getCandidatos, {
        enabled: true,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }
 */




    return (
        <div className='postulate'>
            <label className='oferta-nombre'>{ofertaDescripcion }</label>
            <input type='email' name='email' placeholder='Email' />
        </div>   
  );
}

export default Postulate