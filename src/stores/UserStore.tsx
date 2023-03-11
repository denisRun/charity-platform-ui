import { action, makeAutoObservable } from 'mobx';
import { UserServiceInstance } from '../services/UserService';
import { INotification } from '../types/Notification';
import { IUserLogin } from '../types/UserLogin';
import { IUserSignup } from '../types/UserSignup';
import { IUser } from '../types/UserType';

export class UserStore {
    user: IUser | null = null;
    notifications: INotification[] | null = null;
    isLoading: boolean = false;
    isError: boolean = false;
    errorMessage: string = '';

    constructor(){
        makeAutoObservable(this);
        if(localStorage.getItem("token") != null){
            //alert("relogin with token");
        }
    }

    login = async (credentials: IUserLogin): Promise<void> => {
        try{
            this.startOperation();
            const user = await UserServiceInstance.login(credentials);
            this.user = user;
            this.finishOperation();
            localStorage.setItem("token", user.token);
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }    

    signup = async (credentials: IUserSignup): Promise<void> => {
        try{
            this.startOperation();
            const user = await UserServiceInstance.signup(credentials);
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }    

    logout = async (): Promise<void> => {
        try{
            this.user = null;
            this.finishOperation();
            localStorage.clear();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    changePassword = async (): Promise<void> => {
        try{
            this.startOperation();
            const user = await UserServiceInstance.changePassword();
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
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
            this.user = createdUser;
        } catch(ex){
            console.log(ex);
        }
    }

    updateUser = async (id: string, itemToUpdate: IUser): Promise<void> => {
        try{
            const updatedUser = await UserServiceInstance.updateUser(id, itemToUpdate);
            this.user = updatedUser;
        } catch(ex){
            console.log(ex);
        }
    }

    getNotifications = async (): Promise<void> => {
        try{
            this.startOperation();
            const notifications = await UserServiceInstance.getNotifications();
            this.notifications = notifications;
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    startOperation = () => {
        this.isLoading = true;
        this.isError = false;
        this.errorMessage = '';
    }

    finishOperation = () => {
        this.isLoading = false;
        this.isError = false;
        this.errorMessage = '';
    }

    operationFailed = (ex: string) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = ex;
    }
}

export default new UserStore();