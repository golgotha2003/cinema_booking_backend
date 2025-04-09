import { Document, Model } from "mongoose";
import { Role } from "../utils/user/role.enum";

export interface IUser extends Document {
    avatar: string;
    email: string;
    password: string;
    full_name: string;
    phone: string;
    role: Role;
    is_active: boolean;
    is_locked: boolean;
}

export interface IUserModel extends Model<IUser> {
    findByCredentials(email: string, password: string): Promise<IUser>;
}