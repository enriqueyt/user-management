import e from "express";

export class User {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  shortDescription: string;
  createAt: Date;
  updateAt: Date;
}

export interface IFilterUser {
  firstName: string;
  lastName: string;
  email: string;
}
