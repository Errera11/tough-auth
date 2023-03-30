import {makeAutoObservable} from 'mobx';
import IUser from '../models/IUser';
import authService from '../service/auth-service';
import axios from 'axios';

export default class Store {

    user = {} as IUser;
    isAuth: boolean = false;
    isLoading: boolean = true;;
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
            const response = await authService.signIn(email, password);
            localStorage.setItem('token', 'Bearer ' + response.data.accToken);
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
                localStorage.setItem('token', 'Bearer ' + response.data.accToken);
                this.setUser(response.data.user);
                this.setAuth(true);

            }
            catch(e) {
                console.log(e);
            }
    }

    async signOut() {
        localStorage.removeItem('token');
        this.setUser({} as IUser);
        this.setAuth(false);
        await authService.signOut();
    }

    setLoading(value: boolean) {
            this.isLoading = value;
        }

    async checkAuth() {
        this.setLoading(true);
        try {
            this.setAuth(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/refreshToken`, {withCredentials: true});
            this.setUser(response.data.user);
            localStorage.setItem('token', 'Bearer ' + response.data.accToken);
        } catch(e) {
            console.log(e)
        } finally {
             this.setLoading(false);
        }
    }


}