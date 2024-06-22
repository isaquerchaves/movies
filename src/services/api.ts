import axios from 'axios'

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "44887cee93537230e792ea1ce7aeabab",
    language: "pt-BR",
    include_adults: false,
  },
});