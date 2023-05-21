
import { INotificationResource } from "../../types/NotificationResource";
import { IUserLoginRequest } from "../../types/UserLoginRequest";
import { IUserResource } from "../../types/UserResource";
import { IUserSignupRequest } from "../../types/UserSignupRequest";
import { IUserService } from "../UserService";

class UserService implements IUserService {

    public async login(credentials: IUserLoginRequest): Promise<IUserResource> {
        return Promise.resolve(this.user);
    }

    public async loginAdmin(credentials: IUserLoginRequest): Promise<IUserResource> {
        return Promise.resolve(this.user);
    }

    public async refresUserData(token: string): Promise<IUserResource> {
        return Promise.resolve(this.user);
    }

    public async signup(credentials: IUserSignupRequest): Promise<IUserResource> {
        return Promise.resolve(this.user);
    }

    public async getNotifications(): Promise<INotificationResource[]> {
        return Promise.resolve(this.notifications);
    }

    public async readNotifications(ids: string[]): Promise<void> {
        return Promise.resolve();
    }

    async refreshUserData(refreshToken: string): Promise<IUserResource> {
        return Promise.resolve(this.user);
    }

    async changePassword(): Promise<void> {
        return Promise.resolve();    
    }

    user: IUserResource = {
        firstName: "firstName",
        secondName: "secondName",
        email: "email",
        profileImageURL: "profileImageURL",
      };

    notifications = [
        new INotificationResource(),
        new INotificationResource()
    ]
  }
  
 export const UserServiceInstance = new UserService();