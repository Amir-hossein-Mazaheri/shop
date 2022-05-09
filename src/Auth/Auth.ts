import { decodeJwt } from "jose";
import axiosAuth from "../Api/axiosAuth";

const enum Token {
  ACCESS = "access",
  REFRESH = "refresh",
}

type tokenType = Token.ACCESS | Token.REFRESH;

class Auth {
  /**
   * sets value into localStorage and return it unless just return
   */
  protected static setGetInLocalStorage(type: tokenType, value?: string) {
    if (value) {
      localStorage.setItem(type, value);
    }

    return localStorage.getItem(type) || "";
  }

  /**
   * validate token format and expiration time
   */
  protected static isTokenValid(value: string) {
    try {
      const { exp } = decodeJwt(value);

      return exp && exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  refresh(value?: string) {
    return Auth.setGetInLocalStorage(Token.REFRESH, value);
  }

  access(value?: string) {
    return Auth.setGetInLocalStorage(Token.ACCESS, value);
  }

  isRefreshValid() {
    const refresh = this.refresh();
    console.log(refresh);
    if (refresh) {
      return Auth.isTokenValid(refresh);
    }
  }

  isAccessValid() {
    const access = this.access();

    if (access) {
      return Auth.isTokenValid(access);
    }
  }

  async getNewAccessToken() {
    if (this.isRefreshValid()) return;

    if (!this.isAccessValid()) return this.access();

    const {
      data: { access },
    } = await axiosAuth.post("jwt/user/", {
      refresh: this.refresh(),
    });

    return access;
  }

  /**
   * First : checks whether there is a refresh and access token in localStorage,
   * Second : checks whether refresh is expired or not,
   */
  isUserLoggedIn() {
    if (!(this.refresh() && this.access())) return false;

    return this.isRefreshValid();
  }

  /**
   *
   * @param callback called after loggin out
   */
  logout(callback?: () => void) {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");

    if (callback) {
      callback();
    }
  }
}

export default new Auth();
