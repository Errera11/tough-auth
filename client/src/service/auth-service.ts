import {AxiosResponse} from 'axios';
import IAuthResponse from '../models/IAuthResponse';
import api from '../http/index';

export default class {
    static async signIn(email: string, password: string) : Promise<AxiosResponse<IAuthResponse>>{
        return api.post('/signIn', {email, password});
    }

    static async signUp(email: string, password: string) : Promise<AxiosResponse<IAuthResponse>>{
        return api.post('/signUp', {email, password});
    }

    static async signOut() : Promise<void>{
        return api.post('/signOut');
    }
}