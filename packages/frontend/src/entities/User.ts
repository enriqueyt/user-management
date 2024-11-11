export enum Gender {
    Male = 'Male',
    Female = 'Female'
}

export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    email: string;
    shortDescription: string;
}

export const defaultUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    gender: Gender.Female,
    email: '',
    shortDescription: ''
}