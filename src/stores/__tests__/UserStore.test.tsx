//mocked modules
jest.mock("../../services/UserService");
jest.mock("../../axios/Axios")

import { IUserLoginRequest } from "../../types/UserLoginRequest";
import {UserStore} from "../UserStore";

describe("UserStore tests", () => {
  it("logged in user should be setted in mobx state", async () => {
    const store = new UserStore();
    await store.login(new IUserLoginRequest());

    expect(store.user).not.toBeUndefined();
    expect(store.user).not.toBeNull();

    expect(store.user?.firstName).toBe("firstName")
    expect(store.user?.secondName).toBe("firstName")
    expect(store.user?.email).toBe("email")
    expect(store.user?.profileImageURL).toBe("profileImageURL")
  });

  it("after page refresh user-data should be refreshed", async () => {
    const store = new UserStore();
    await store.refreshUserData();

    expect(store.user).not.toBeUndefined();
    expect(store.user).not.toBeNull();

    expect(store.user?.firstName).toBe("firstName")
    expect(store.user?.secondName).toBe("firstName")
    expect(store.user?.email).toBe("email")
    expect(store.user?.profileImageURL).toBe("profileImageURL")
  });

  it("after user register, user should not be logged in", async () => {
    const store = new UserStore();
    await store.refreshUserData();

    expect(store.user).toBeNull();
  });

  it("after user is authenticated, notificatinos should be loaded", async () => {
    const store = new UserStore();
    await store.getNotifications();

    expect(store.notifications).not.toBeUndefined();
    expect(store.notifications).not.toBeNull();

    expect(store.notifications.length).toBe(2);
  });

  it("after user is authenticated, user should be able to mark messages as read", async () => {
    const store = new UserStore();
    await store.readNotifications(["1","2"]);
   
    expect(store.notifications).not.toBeUndefined();
    expect(store.notifications).not.toBeNull();
  });
});

