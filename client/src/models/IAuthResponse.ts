import IUser from './IUser';

export default interface IAuthResponse {
    refreshToken: string,
    accessToken: string,
    user: IUser
}