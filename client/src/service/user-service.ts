import api from '../http/index'
import {AxiosResponse} from 'axios';
import IUser from '../models/IUser';

export default class {
    static async getUsers(): Promise<AxiosResponse<IUser[]>>{
        return api.post<IUser[]>('getUsers');
    }
}