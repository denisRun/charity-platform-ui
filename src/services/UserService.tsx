import axios from "../axios/Axios";
import { IPagedResultSet } from "../types/PagedResultSet";
import { UserSearchRequest } from "../types/UserSearchRequest";
import { IUser } from "../types/UserType";

export interface IUserService{
    authorize(username: string, password: string): Promise<IUser>;
    getUsers(query: string): Promise<IUser[]>;
    getUser(id: string): Promise<IUser>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(id: string, user: IUser): Promise<IUser>;
}

const controllerPath = "/api/Users";

class UserService implements IUserService{

    async authorize(username: string, password: string): Promise<IUser> {

        const request = {
            username:username,
            password:password
        };

        const response = await axios.post<IUser>(controllerPath + "/authorize", JSON.stringify(request));
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