import { createContext, useContext } from "react";

type AuthContextType = {
  user: {
    email : string;
    messages : {
      userId : string;
      question : string;
      response : string
    }[];
  };
  login: (userData: any) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext)!;
};