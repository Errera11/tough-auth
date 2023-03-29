import {AxiosResponse} from 'axios';
import IAuthResponse from '../models/IAuthResponse';
import api from '../http/index';

export default class Auth {

    static async signIn(email: string, password: string): Promise<AxiosResponse<IAuthResponse>>{
        return api.post<IAuthResponse>('/signIn', {email, password});
    }

    static async signUp(email: string, password: string) : Promise<AxiosResponse<IAuthResponse>>{
        const response = api.post<IAuthResponse>('/signUp', {email, password});
        return response;
    }

    static async signOut() : Promise<void>{
        return await api.post('/signOut');
    }

}