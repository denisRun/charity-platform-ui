import { action, makeAutoObservable } from 'mobx';
import { IUserService, UserServiceInstance } from '../services/UserService';
import { INotificationResource } from '../types/NotificationResource';
import { IUserLoginRequest } from '../types/UserLoginRequest';
import { IUserSignupRequest } from '../types/UserSignupRequest';
import { IUserResource } from '../types/UserResource';
import { ITagResource } from '../types/TagResource';
import { TagServiceInstance } from '../services/TagService';
import { IComplainSearchResource } from '../types/ComplainSearchResource';
import { IComplaintService } from '../services/ComplaintService';

export class AdminStore {
    user: IUserResource | null = null;
    complaints: IComplainSearchResource = new IComplainSearchResource();

    UserService: IUserService;
    ComplaintService: IComplaintService;

    constructor(userService: IUserService, complaintService: IComplaintService){
        makeAutoObservable(this);

        this.UserService = userService;
        this.ComplaintService = complaintService;

        if(localStorage.getItem("token") != null){
            this.refreshUserData();
        }
    }

    login = async (credentials: IUserResource): Promise<void> => {
        try{
            this.startOperation();
            const user = await this.UserService.loginAdmin(credentials);
            this.user = user;
            this.finishOperation();
            localStorage.setItem("token", user.token!);
            localStorage.setItem("admin_refreshToken", user.refreshToken!);
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }    

    refreshUserData = async (): Promise<void> => {
        try{
            let refreshToken = localStorage.getItem("admin_refreshToken");
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

    getComplaints = async (): Promise<void> => {
        try{
            this.startOperation();
            this.complaints = await this.ComplaintService.getComplaints();
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }    

    banUser = async (userId: number): Promise<void> => {
        try{
            this.startOperation();
            await this.ComplaintService.banUser(userId);
            this.complaints = await this.ComplaintService.getComplaints();
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }   

    banEvent = async (eventId: number, eventType: string): Promise<void> => {
        try{
            this.startOperation();
            await this.ComplaintService.banEvent(eventId, eventType);
            this.complaints = await this.ComplaintService.getComplaints();
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