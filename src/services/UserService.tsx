import axios from "../axios/Axios";
import { INotificationResource } from "../types/NotificationResource";
import { IPagedResultSet } from "../types/PagedResultSet";
import { IUserLoginRequest } from "../types/UserLoginRequest";
import { UserSearchRequest } from "../types/UserSearchRequest";
import { IUserSignupRequest } from "../types/UserSignupRequest";
import { IUserResource } from "../types/UserResource";

export interface IUserService{
    login(credentials: IUserLoginRequest): Promise<IUserResource>;
    loginAdmin(credentials: IUserLoginRequest): Promise<IUserResource>;
    refreshUserData(refreshToken: string): Promise<IUserResource>;
    signup(credentials: IUserSignupRequest): Promise<IUserResource>;
    changePassword(): Promise<void>;
    getNotifications(): Promise<INotificationResource[]>;
    readNotifications(ids: string[]): Promise<void>;
}

const authControllerPath = "/auth";
const apiControllerPath = "/api";
const userControllerPath = "/user";

class UserService implements IUserService{

    async login(credentials: IUserLoginRequest): Promise<IUserResource> {
        const response = await axios.post<IUserResource>(authControllerPath + "/sign-in", JSON.stringify(credentials));
        return response.data;
    }

    async loginAdmin(credentials: IUserLoginRequest): Promise<IUserResource> {
        const response = await axios.post<IUserResource>(authControllerPath + "/sign-in-admin", JSON.stringify(credentials));
        return response.data;
    }

    async refreshUserData(refreshToken: string): Promise<IUserResource> {
        const tokenObj = {
            refreshToken: refreshToken
        }
        const response = await axios.post<IUserResource>(apiControllerPath + "/refresh-user-data", JSON.stringify(tokenObj));
        return response.data;
    }

    async signup(credentials: IUserSignupRequest): Promise<IUserResource> {
        const response = await axios.post<IUserResource>(authControllerPath + "/sign-up", JSON.stringify(credentials));
        return response.data;
    }

    async changePassword(): Promise<void> {
        const response = await axios.post<void>(authControllerPath + "/reset-password");
    }

    async getNotifications(): Promise<INotificationResource[]> {
        const response = await axios.get<INotificationResource[]>(userControllerPath + "/notifications");
        return response.data;
    }

    async readNotifications(ids: string[]): Promise<void> {
        const request = {
            IDs: ids
        }
        const response = await axios.put<void>(apiControllerPath + "/read-notifications", JSON.stringify(request));
        return;
    }
}

/**
 * Export only one Instance of class
*/
export const UserServiceInstance: IUserService = new UserService();