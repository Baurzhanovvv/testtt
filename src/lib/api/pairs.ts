import axios from 'axios';

const BASE_URL = 'http://localhost:3001/pairs';

export const getPairs = async () => {
  const response = await axios.get("http://localhost:3001/pairs?page=1&limit=10");
  return response.data;
};

export const addPair = async (pair: { base: string; quote: string; interval: number }) => {
  const response = await axios.post(BASE_URL, pair);
  return response.data;
};

export const updatePair = async (id: number, pair: { base: string; quote: string; interval: number }) => {
  const response = await axios.put(`${BASE_URL}/${id}`, pair);
  return response.data;
};

export const deletePair = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
