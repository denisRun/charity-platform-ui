import { action, makeAutoObservable } from 'mobx';
import { UserServiceInstance } from '../services/UserService';
import { INotificationResource } from '../types/NotificationResource';
import { IUserLoginRequest } from '../types/UserLoginRequest';
import { IUserSignupRequest } from '../types/UserSignupRequest';
import { IUserResource } from '../types/UserResource';
import { ITagResource } from '../types/TagResource';
import { TagServiceInstance } from '../services/TagService';

export class UserStore {
    user: IUserResource | null = null;
    notifications: INotificationResource[] = [];
    isLoading: boolean = false;
    isError: boolean = false;
    errorMessage: string = '';

    constructor(){
        makeAutoObservable(this);
        if(localStorage.getItem("token") != null){
            this.refreshUserData(localStorage.getItem("refreshToken")!);
        }
    }

    login = async (credentials: IUserResource): Promise<void> => {
        try{
            this.startOperation();
            const user = await UserServiceInstance.login(credentials);
            this.user = user;
            this.finishOperation();
            localStorage.setItem("token", user.token!);
            localStorage.setItem("refreshToken", user.refreshToken!);
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }    

    refreshUserData = async (refreshToken: string): Promise<void> => {
        try{
            this.startOperation();
            const user = await UserServiceInstance.refreshUserData(refreshToken);
            this.user = user;
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }    

    signup = async (credentials: IUserSignupRequest): Promise<void> => {
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

    upsertUserTags = async (eventType: string, tags: ITagResource[]): Promise<void> => {
        try{
            this.startOperation();
            const user = await TagServiceInstance.upsertUserSearchTags(eventType, tags);
            await this.refreshUserData(localStorage.getItem('refreshToken')!)
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  
    // getUser = async (id?: string): Promise<void> => {
    //     try{
    //         const user = await UserServiceInstance.getUser(id!);
    //         this.user = user;
    //     } catch(ex){
    //         console.log(ex);
    //     }
    // }

    // createUser = async (newItem: IUser): Promise<void> => {
    //     try{
    //         const createdUser = await UserServiceInstance.createUser(newItem);
    //         this.user = createdUser;
    //     } catch(ex){
    //         console.log(ex);
    //     }
    // }

    // updateUser = async (id: string, itemToUpdate: IUser): Promise<void> => {
    //     try{
    //         const updatedUser = await UserServiceInstance.updateUser(id, itemToUpdate);
    //         this.user = updatedUser;
    //     } catch(ex){
    //         console.log(ex);
    //     }
    // }

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