import {ProfileModel} from './profile.model';

export class AccountModel {
    public activated: boolean;
    public authorities: string[];
    public email: string;
    public firstName: string;
    public langKey: string;
    public lastName: string;
    public login: string;
    public phone: string;
    public imageUrl: string;
    public id: number;
    public image: string;
    public imageContentType: string;
}
