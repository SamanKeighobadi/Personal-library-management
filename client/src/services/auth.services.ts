import api from "@/apis/Api";
import type { LoginBody, RegisterBody } from "@/types/auth.types";

export const login  = async (data:LoginBody) =>{
    return await api.post("/login",data)
}

export const register = async (data:RegisterBody) =>{
    return await api.post('/register',data)
}