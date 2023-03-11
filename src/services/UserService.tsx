import axios from "../axios/Axios";
import { INotification } from "../types/Notification";
import { IPagedResultSet } from "../types/PagedResultSet";
import { IUserLogin } from "../types/UserLogin";
import { UserSearchRequest } from "../types/UserSearchRequest";
import { IUserSignup } from "../types/UserSignup";
import { IUser } from "../types/UserType";

export interface IUserService{
    login(credentials: IUserLogin): Promise<IUser>;
    changePassword(): Promise<void>;
    getUsers(query: string): Promise<IUser[]>;
    getUser(id: string): Promise<IUser>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(id: string, user: IUser): Promise<IUser>;
}

const authControllerPath = "/auth";
const userControllerPath = "/user";

class UserService implements IUserService{

    async login(credentials: IUserLogin): Promise<IUser> {
        const response = await axios.post<IUser>(authControllerPath + "/sign-in", JSON.stringify(credentials));
        return response.data;
    }

    async signup(credentials: IUserSignup): Promise<IUser> {
        const response = await axios.post<IUser>(authControllerPath + "/sign-up", JSON.stringify(credentials));
        return response.data;
    }

    async changePassword(): Promise<void> {
        const response = await axios.post<void>(authControllerPath + "/reset-password");
    }

    async getNotifications(): Promise<INotification[]> {
        const response = await axios.get<INotification[]>(userControllerPath + "/notifications");
        return response.data;
    }
    // ALL the following should be REMOVED


    async getUsers(query: string): Promise<IUser[]> {
        const request: UserSearchRequest = {
            query:query,
            pageNumber:1,
            pageSize:20
        };
        const response = await axios.post<IPagedResultSet<IUser>>(authControllerPath + '/search', request);
        return response.data.items;
    }

    async getUser(id?: string): Promise<IUser> {
        const response = await axios.get<IUser>(authControllerPath + "/" + id);
        return response.data;
    }

    async createUser(user: IUser): Promise<IUser> {
        const response = await axios.post<IUser>(authControllerPath, JSON.stringify(user));
        return response.data;
    }

    async updateUser(id: string, user: IUser): Promise<IUser> {
        const response = await axios.put<IUser>(authControllerPath + "/" +id, JSON.stringify(user));
        return response.data;
    }
}

/**
 * Export only one Instance of class
*/
export const UserServiceInstance = new UserService();