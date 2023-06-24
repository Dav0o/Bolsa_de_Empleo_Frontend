import api from "../api/config";

export const getOfertaHabilidades = async () => {
  try {
    const response = await api.get(`ofertahabilidades`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch offer skills");
  }
};
