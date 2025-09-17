import api from "@/apis/Api";
import type { LoginBody, RegisterBody } from "@/types/auth.types";

export const login  = async (data:LoginBody) =>{
    return await api.post("auth/login",data)
}

export const register = async (data:RegisterBody) =>{
    console.log(data)
    console.log(api)
    return await api.post('auth/register',data)
}