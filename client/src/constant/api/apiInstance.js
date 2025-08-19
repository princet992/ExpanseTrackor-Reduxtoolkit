// import axios from "axios";


// const api = axios.create({baseURL:import.meta.env.VITE_API_URL });
// // const api = axios.create({baseURL:"http://localhost:8080"});

// api.interceptors.request.use((config)=>{
//     const token = localStorage.getItem("token");
//     if(token) config.headers.Authorization = `Bearer ${token}`
//     return config
// })

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? "/api"                     // in production → same domain
    : "http://localhost:5000/api" // in dev → backend runs separately
});

export default api;