import api from "../api/config";

export const getSkills = async () => { 
    let data = await api.get('habilidades').then(result => result.data);
    return data;
};


export const createCandidateSkills = async (candidatohabilidad) => {
    let data = await api.post('CandidatoHabilidades',candidatohabilidad).then(result => result.data);
    return data;

}