import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
});

api.interceptors.response.use(res => res,async(error)=>{
    const originalRequest = error.config ;

    if(error.response?.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;

        try{
            await axios.get('http://localhost:3000/api/auth/refresh',{withCredentials : true});

            return api(originalRequest);
            
        }catch(error){
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
})

export default api;