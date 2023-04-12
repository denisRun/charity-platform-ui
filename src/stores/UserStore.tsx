import { action, makeAutoObservable } from 'mobx';
import { IUserService, UserServiceInstance } from '../services/UserService';
import { INotificationResource } from '../types/NotificationResource';
import { IUserLoginRequest } from '../types/UserLoginRequest';
import { IUserSignupRequest } from '../types/UserSignupRequest';
import { IUserResource } from '../types/UserResource';
import { ITagResource } from '../types/TagResource';
import { TagServiceInstance } from '../services/TagService';

export class UserStore {
    user: IUserResource | null = null;
    notifications: INotificationResource[] = [];

    UserService: IUserService;

    constructor(userService: IUserService){
        makeAutoObservable(this);

        this.UserService = userService;

        if(localStorage.getItem("token") != null){
            this.refreshUserData();
        }
    }

    login = async (credentials: IUserResource): Promise<void> => {
        try{
            this.startOperation();
            const user = await this.UserService.login(credentials);
            this.user = user;
            this.finishOperation();
            localStorage.setItem("token", user.token!);
            localStorage.setItem("refreshToken", user.refreshToken!);
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }    

    refreshUserData = async (): Promise<void> => {
        try{
            let refreshToken = localStorage.getItem("refreshToken");
            if(!refreshToken){
                return;
            }

            this.startOperation();
            const user = await this.UserService.refreshUserData(refreshToken);
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
            const user = await this.UserService.signup(credentials);
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
            const user = await this.UserService.changePassword();
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
            await this.refreshUserData()
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    getNotifications = async (): Promise<void> => {
        try{
            this.startOperation();
            const notifications = await this.UserService.getNotifications();
            this.notifications = notifications;
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    readNotifications = async (ids: string[]): Promise<void> => {
        try{
            this.startOperation();
            await this.UserService.readNotifications(ids);
            this.refreshUserData();
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    isLoading: boolean = false;
    isError: boolean = false;
    errorMessage: string = '';

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