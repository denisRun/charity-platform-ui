
import { INotificationResource } from "../../types/NotificationResource";
import { IUserLoginRequest } from "../../types/UserLoginRequest";
import { IUserResource } from "../../types/UserResource";
import { IUserSignupRequest } from "../../types/UserSignupRequest";

class UserService {

    user = {
        firstName: "firstName",
        secondName: "secondName",
        email: "email",
        profileImageUrl: "profileImageUrl"
    };

    notifications = [
        new INotificationResource(),
        new INotificationResource()
    ]

    public async login(credentials: IUserLoginRequest): Promise<IUserResource> {
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
  }
  
 export const UserServiceInstance = new UserService();