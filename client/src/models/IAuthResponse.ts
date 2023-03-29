import IUser from './IUser';

export default interface IAuthResponse {
    refreshToken: string,
    accToken: string,
    user: IUser
}