import api from "../api/config";


export const getCandidatoHabilidades = async () => { 
    let data = await api.get('candidatohabilidades').then(result => result.data);
    return data;
};