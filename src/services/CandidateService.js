import api from "../api/config";


export const getCandidatos = async () => { 
    let data = await api.get('candidatos').then(result => result.data);
    return data;
};

export const create = async (candidato) => { 
    let data = await api.post('candidatos',candidato).then(result => result.data);
    return data;
};

