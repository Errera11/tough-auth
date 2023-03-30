import axios from 'axios';
import IAuthResponse from '../models/IAuthResponse'

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

api.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
})

api.interceptors.response.use(config => config, async (error) => {
    try {
        console.log(error);
        const originReq = error.config;
        if(error.response.status == 401 && !error.config._isRetry && error.config) {
            originReq._isRetry = true;
            console.log(`${process.env.REACT_APP_API_URL}/refreshToken`)
            const response = await axios.get<IAuthResponse>(`${process.env.REACT_APP_API_URL}/refreshToken`, {withCredentials: true});
            localStorage.setItem('token', 'Bearer ' + response.data.accToken);
            return api.request(originReq);
        }
    } catch(e) {
        console.log(e);
    }
    throw error;

})

export default api;