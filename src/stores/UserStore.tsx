import { action, makeAutoObservable } from 'mobx';
import { UserServiceInstance } from '../services/UserService';
import { IUser } from '../types/UserType';

export class UserStore {
    users: IUser[] = [];
    user: IUser | null = null;
    isLoading: boolean = false;
    isError: boolean = false;

    constructor(){
        makeAutoObservable(this);
    }

    getUsers = async (query: string): Promise<void> => {
        try{
            this.startOperation()
            
            const userList = await UserServiceInstance.getUsers(query);
            this.users = userList;

            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed()
        }
    }

    getUser = async (id?: string): Promise<void> => {
        try{
            const user = await UserServiceInstance.getUser(id);
            this.user = user;
        } catch(ex){
            console.log(ex);
        }
    }

    createUser = async (newItem: IUser): Promise<void> => {
        try{
            const createdUser = await UserServiceInstance.createUser(newItem);
            this.users.push(createdUser);
        } catch(ex){
            console.log(ex);
        }
    }

    updateUser = async (id: string, itemToUpdate: IUser): Promise<void> => {
        try{
            const updatedUser = await UserServiceInstance.updateUser(id, itemToUpdate);
            this.users = this.users.map(item => item.id === updatedUser.id ? updatedUser : item);
        } catch(ex){
            console.log(ex);
        }
    }

    startOperation = () => {
        this.isLoading = true;
        this.isError = false;
    }

    finishOperation = () => {
        this.isLoading = false;
        this.isError = false;
    }

    operationFailed = () => {
        this.isLoading = false;
        this.isError = true;
    }
}

export default new UserStore();