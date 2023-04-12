//mocked modules
jest.mock("../../axios/Axios")

import { IUserService } from "../../services/UserService";
import { UserServiceInstance } from "../../services/__mock__/UserService";
import { IUserLoginRequest } from "../../types/UserLoginRequest";
import { IUserSignupRequest } from "../../types/UserSignupRequest";
import {UserStore} from "../UserStore";

describe("UserStore tests", () => {
  it("logged in user should be setted in mobx state", async () => {
    const userService: IUserService = UserServiceInstance;
    const store = new UserStore(userService);
    await store.login(new IUserLoginRequest());

    expect(store.user).not.toBeUndefined();
    expect(store.user).not.toBeNull();

    expect(store.user?.firstName).toBe("firstName")
    expect(store.user?.secondName).toBe("secondName")
    expect(store.user?.email).toBe("email")
    expect(store.user?.profileImageURL).toBe("profileImageURL")
  });

  it("after page refresh user-data should be refreshed", async () => {
    const userService: IUserService = UserServiceInstance;
    const store = new UserStore(userService);
    await store.refreshUserData();

    expect(store.user).not.toBeUndefined();
    expect(store.user).not.toBeNull();

    expect(store.user?.firstName).toBe("firstName")
    expect(store.user?.secondName).toBe("secondName")
    expect(store.user?.email).toBe("email")
    expect(store.user?.profileImageURL).toBe("profileImageURL")
  });

  it("user should be registered", async () => {
    const userService: IUserService = UserServiceInstance;
    const store = new UserStore(userService);
    await store.signup(new IUserSignupRequest());

    expect(store.user).not.toBeNull();
  });

  it("after user is authenticated, notificatinos should be loaded", async () => {
    const userService: IUserService = UserServiceInstance;
    const store = new UserStore(userService);
    await store.getNotifications();

    expect(store.notifications).not.toBeUndefined();
    expect(store.notifications).not.toBeNull();

    expect(store.notifications.length).toBe(2);
  });

  it("after user is authenticated, user should be able to mark messages as read", async () => {
    const userService: IUserService = UserServiceInstance;
    const store = new UserStore(userService);
    await store.readNotifications(["1","2"]);
   
    expect(store.notifications).not.toBeUndefined();
    expect(store.notifications).not.toBeNull();
  });
});

