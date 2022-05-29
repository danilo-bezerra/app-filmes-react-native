import axios from "axios";

//URL: https://api.themoviedb.org/3/

///movie/now_playing?api_key=53e1acc57990d3eded0a4ab50942672a&language=pt-BR&page=1

export const key = "53e1acc57990d3eded0a4ab50942672a";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;
