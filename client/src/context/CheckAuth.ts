import api from "../services/axios"
import { useAuth } from "./AuthContext";

export const checkAuth = async () => {
  const {login} = useAuth();
  try{
    const {data} = await api.get('/auth/me');
    login(data.userData);
  }catch(error){
    console.log(error);
  }
}