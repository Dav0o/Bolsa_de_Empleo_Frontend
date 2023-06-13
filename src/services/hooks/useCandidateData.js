import { useQuery } from 'react-query'
import axios from "axios"

const fetchCandidate = (candidateId) => {
    return axios.get(`https://localhost:7209/api/Candidatos/${candidateId}`)
}

export const useCandidateData = (candidateId) => {
    return useQuery(['candidato', candidateId], () => fetchCandidate(candidateId))
}

