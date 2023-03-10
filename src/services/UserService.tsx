import axios from "../axios/Axios";
import { IPagedResultSet } from "../types/PagedResultSet";
import { IUserLogin } from "../types/UserLogin";
import { UserSearchRequest } from "../types/UserSearchRequest";
import { IUserSignup } from "../types/UserSignup";
import { IUser } from "../types/UserType";

export interface IUserService{
    login(credentials: IUserLogin): Promise<IUser>;
    getUsers(query: string): Promise<IUser[]>;
    getUser(id: string): Promise<IUser>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(id: string, user: IUser): Promise<IUser>;
}

const controllerPath = "/auth";

class UserService implements IUserService{

    async login(credentials: IUserLogin): Promise<IUser> {
        const response = await axios.post<IUser>(controllerPath + "/sign-in", JSON.stringify(credentials));
        return response.data;
    }

    async signup(credentials: IUserSignup): Promise<IUser> {
        const response = await axios.post<IUser>(controllerPath + "/sign-up", JSON.stringify(credentials));
        return response.data;
    }


    // ALL the following should be REMOVED


    async getUsers(query: string): Promise<IUser[]> {
        const request: UserSearchRequest = {
            query:query,
            pageNumber:1,
            pageSize:20
        };
        const response = await axios.post<IPagedResultSet<IUser>>(controllerPath + '/search', request);
        return response.data.items;
    }

    async getUser(id?: string): Promise<IUser> {
        const response = await axios.get<IUser>(controllerPath + "/" + id);
        return response.data;
    }

    async createUser(user: IUser): Promise<IUser> {
        const response = await axios.post<IUser>(controllerPath, JSON.stringify(user));
        return response.data;
    }

    async updateUser(id: string, user: IUser): Promise<IUser> {
        const response = await axios.put<IUser>(controllerPath + "/" +id, JSON.stringify(user));
        return response.data;
    }
}

/**
 * Export only one Instance of class
*/
export const UserServiceInstance = new UserService();