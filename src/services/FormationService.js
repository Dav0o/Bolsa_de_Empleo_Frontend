import api from "../api/config";


export const getFormations = async () => { 
    let data = await api.get('formaciones_academicas').then(result => result.data);
    return data;
};

export const create = async (formation) => { 
    let data = await api.post('formaciones_academicas',formation).then(result => result.data);
    return data;
};
