import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemons = async (limit = 50) => {
  const response = await api.get(`/pokemon?limit=${limit}`);
  return response.data.results;
};

export const getPokemonDetails = async (name) => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data;
};
