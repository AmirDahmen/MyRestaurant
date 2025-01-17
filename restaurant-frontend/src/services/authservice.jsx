import axios from "../Api/axios"; 
const USER_API = "/"; 

export const signup = async (user) => {
    return await axios.post(`${USER_API}users/register`, user);
};

export const signin = async (user) => {
    return await axios.post(`${USER_API}users/login`, user);
};

export const logout = async () => {
    return await axios.post(`${USER_API}users/logout`);
};

export const profile = async () => {
    return await axios.get(`${USER_API}user-profile`);  
};
