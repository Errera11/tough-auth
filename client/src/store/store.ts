import {makeAutoObservable} from 'mobx';
import IUser from '../models/IUser';
import authService from '../service/auth-service';

export default class Store {

    user = {} as IUser;
    isAuth: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(value: boolean) {
        this.isAuth = value;
    }

    setUser(value: IUser) {
        this.user = value;
    }

    async signIn(email: string, password: string) {
        try {
            const response = await authService.signUp(email, password);
            localStorage.setItem('token', 'Bearer ' + response.data.accessToken);
            this.setUser(response.data.user);
            this.setAuth(true);
        }
        catch(e) {
            console.log(e);
        }
    }

    async signUp(email: string, password: string) {
            try {
                const response = await authService.signUp(email, password);
                localStorage.setItem('token', 'Bearer ' + response.data.accessToken);
                this.setUser(response.data.user);
                this.setAuth(true);
            }
            catch(e) {
                console.log(e);
            }
    }

    async signOut() {
        await authService.signOut();
        localStorage.removeItem('token');
        this.setUser({} as IUser);
        this.setAuth(false);
    }

}