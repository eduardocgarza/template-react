import Logger from "../constants/Logger";
import useLocalStorage from "./hooks/useLocalStorage";
import { publicRouter } from "../network/serverRouter";
import React, { createContext, useContext, useEffect, useState } from "react";
import useAuthenticatedRouter from "../network/hooks/useAuthenticatedRouter";
import {
  deactivateAccountServerRoute,
  deleteAccountServerRoute,
  forgotPasswordServerRoute,
  logoutServerRoute,
  resetPasswordServerRoute,
  verifyEmailServerRoute,
  verifyRefreshTokenServerRoute,
  verifyResetPasswordTokenServerRoute,
} from "../network/serverRoutes";


const initialState = {};
const AuthenticationContext = createContext(initialState);


export function AuthenticationContextProvider(props) {
  
  /**
   * @State
   */
  const [appInitialized, setAppInitialized] = useState(false);
  const [authenticationData, setAuthenticatedData] = useState({
    authenticated: false,
    accessToken: "",
    refreshToken: "",
  });
  

  /**
   * @Hooks
   */
  const { 
    addSession, 
    removeSession, 
    authenticatedRouter, 
  } = useAuthenticatedRouter();
  const localStorage = useLocalStorage();


  /**
   * @Methods
   */
  async function checkRefreshToken(refreshToken) {
    if (!refreshToken) return false;
    // 1. Verify Refresh Token with Server
    try {
      const requestData = { refreshToken };
      const response = await publicRouter.post(
        verifyRefreshTokenServerRoute,
        requestData
      );
      const session = response.data;
      // 2. If Valid, set:
      if (response.data) {
        // 2.1. authentication = true, accessToken, refreshToken in memory.
        setAuthenticatedData({
          authenticated: true,
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
        });
        // 2.2. Store updated accessToken and refreshToken in LocalStorage
        localStorage.updateTokensInStorage(session);
        addSession(session.accessToken);
        return true;
      } else return false;
    } catch (error) {
      // If Invalid, return false:
      Logger.error(":: Error in @checkRefreshToken: ", error);
      return false;
    }
  }

  async function initializeApplication() {
    try {
      const { refreshToken } = localStorage.getTokensFromStorage();
      const refreshTokenValid = await checkRefreshToken(refreshToken);

      if (!refreshTokenValid) {
        // localStorage.removeTokensFromStorage();
        return setAuthenticatedData({
          authenticated: false,
          accessToken: "",
          refreshToken: "",
        });
      }
    } finally {
      setAppInitialized(true);
    }
  }

  async function executeAppLogin(session) {
    try {
      // 1. Set authenticationData = true, accessToken, refreshToken in memory.
      addSession(session.accessToken);
      setAuthenticatedData({
        authenticated: true,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      });
      // 2. Store accessToken and refreshToken in LocalStorage
      localStorage.updateTokensInStorage(session);
      // 3. Add accessToken to AuthenticatedRouter
    } catch (error) {
      Logger.error(":: Error in @executeAppLogin: ", error);
    }
  }

  async function executeAppLogout() {
    try {
      const requestData = { refreshToken: authenticationData.refreshToken };
      const response = await authenticatedRouter.post(
        logoutServerRoute,
        requestData
      );
      if (response.status === 200) {
        removeSession();
        localStorage.removeTokensFromStorage();
        setAuthenticatedData({
          authenticated: false,
          accessToken: "",
          refreshToken: "",
        });
      }
    } catch (error) {
      Logger.error(":: Error in @executeAppLogout: ", error);
    }
  }

  async function executeAccountDeactivate(accountID) {
    try {
      const route = deactivateAccountServerRoute(accountID);
      const response = await authenticatedRouter.patch(route);
      Logger.log(":: Response from Deactivate: ", response);
      removeSession();
      localStorage.removeTokensFromStorage();
      setAuthenticatedData({
        authenticated: false,
        accessToken: "",
        refreshToken: "",
      });
      return true;
    } catch (error) {
      Logger.error(":: Error in @executeAccountDeactivate: ", error);
      return false;
    }
  }

  async function executeAccountDelete(accountID) {
    try {
      const route = deleteAccountServerRoute(accountID);
      const response = await authenticatedRouter.delete(route);
      Logger.log(":: Response from Delete: ", response);
      removeSession();
      localStorage.removeTokensFromStorage();
      setAuthenticatedData({
        authenticated: false,
        accessToken: "",
        refreshToken: "",
      });
      return true;
    } catch (error) {
      Logger.error(":: Error in @executeAccountDeactivate: ", error);
      return false;
    }
  }

  async function executeEmailConfirmationTokenVerification(token) {
    try {
      const route = verifyEmailServerRoute(token);
      const requestData = { token };
      const response = await publicRouter.post(route, requestData);
      Logger.log(":: Response from Email Verification: ", response);
      return true;
    } catch (error) {
      Logger.error(":: Error in @executeEmailVerification: ", error);
      return false;
    }
  }

  async function executeForgotPassword(email) {
    try {
      const requestData = { email };
      const response = await publicRouter.post(
        forgotPasswordServerRoute,
        requestData
      );
      Logger.log(":: Response from Forgot Password: ", response);
      return true;
    } catch (error) {
      Logger.error(":: Error in @executeForgotPassword: ", error);
      return false;
    }
  }

  async function executeResetPasswordTokenVerification(token) {
    try {
      const route = verifyResetPasswordTokenServerRoute(token);
      const response = await publicRouter.post(route);
      Logger.log(
        ":: Response from Reset Password Token Verification: ",
        response
      );
      return true;
    } catch (error) {
      Logger.error(
        ":: Error in @executeResetPasswordTokenVerification: ",
        error
      );
      return false;
    }
  }

  async function executeResetPassword(requestData) {
    try {
      const response = await publicRouter.post(
        resetPasswordServerRoute,
        requestData
      );
      Logger.log(":: Response from Reset Password: ", response);
      return true;
    } catch (error) {
      Logger.error(":: Error in @executeResetPassword: ", error);
      return false;
    }
  }

  useEffect(() => {
    initializeApplication();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = {
    appInitialized,

    authenticationData,
    setAuthenticatedData,

    authenticatedRouter,
    executeAppLogin,
    executeAppLogout,
    executeAccountDeactivate,
    executeAccountDelete,

    executeEmailConfirmationTokenVerification,
    executeForgotPassword,
    executeResetPasswordTokenVerification,
    executeResetPassword,
  };

  return (
    <AuthenticationContext.Provider value={context}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthenticationContext() {
  return useContext(AuthenticationContext);
}
