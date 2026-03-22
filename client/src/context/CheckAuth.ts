import api from "../services/axios"

export const checkAuth = async (login:(data:any)=>void) => {
  
  try{
    const {data} = await api.get('/auth/me');
    login(data.userData);
  }catch(error){
    console.log(error);
  }
}