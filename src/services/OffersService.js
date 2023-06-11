import api from "../api/config";


export const getOfertas = async () => { 
    let data = await api.get('oferta_laboral').then(result => result.data);
    return data;
};