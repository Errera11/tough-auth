import api from '../http/index'
import {AxiosResponse} from 'axios';
import IUser from '../models/IUser';

export default class {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    try {
            return api.get<IUser[]>('/users');
        } catch(e: any) {
             throw new Error(e);
        }
    }
}



