import { useEffect, useState } from "react";
import Logger from "../../constants/Logger";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../AuthenticationContext";
import {
  deactivateAccountServerRoute,
  deleteAccountServerRoute,
  editAccountServerRoute,
  getAccountServerRoute,
  sendVerificationEmailServerRoute,
  updateAccountEmailServerRoute,
} from "../../network/serverRoutes";

export default function useAccount() {
  /**
   * @State
   */
  const [account, setAccount] = useState(null);

  /**
   * @Hooks
   */
  const navigate = useNavigate();
  const { authenticatedRouter, setAuthenticatedData } =
    useAuthenticationContext();

  /**
   * @Initialize
   */
  useEffect(() => {
    fetchAccount();
  }, []);

  /**
   * @Methods
   */
  async function fetchAccount() {
    try {
      const response = await authenticatedRouter.get(getAccountServerRoute);
      setAccount(response.data);
    } catch (error) {
      Logger.error("::Error - @fetchAccount", error);
      setAccount(null);
    }
  }

  async function updateAccountPersonalInfo(requestData) {
    try {
      const route = editAccountServerRoute(requestData.accountID);
      await authenticatedRouter.patch(route, requestData);
      setAccount((prevState) => ({
        ...prevState,
        firstName: requestData.firstName,
        lastName: requestData.lastName,
      }));
      return true;
    } catch (error) {
      Logger.error("::Error - @updateAccountPersonalInfo", error);
      return false;
    }
  }

  async function updateAccountEmail(requestData) {
    try {
      const route = updateAccountEmailServerRoute(requestData.accountID);
      await authenticatedRouter.patch(route, requestData);
      setAccount((prevState) => ({
        ...prevState,
        email: requestData.email,
        emailVerified: false,
      }));
      return true;
    } catch (error) {
      Logger.error("::Error - @updateAccountEmail", error);
      return false;
    }
  }

  async function sendVerificationEmail() {
    try {
      const requestData = { email: account.email };
      const response = await authenticatedRouter.post(
        sendVerificationEmailServerRoute,
        requestData
      );
      setAccount(response.data.account);
      return true;
    } catch (error) {
      Logger.error("::Error - @sendVerificationEmail", error);
      return false;
    }
  }

  async function deactivateAccount() {
    try {
      const route = deactivateAccountServerRoute(account.accountID);
      await authenticatedRouter.patch(route);
      setAccount(null);
      setAuthenticatedData((prevState) => ({
        ...prevState,
        authenticated: false,
        accessToken: "",
        refreshToken: "",
      }));
      navigate("/");
      return true;
    } catch (error) {
      Logger.error("::Error - @deactivateAccount", error);
      return false;
    }
  }

  async function deleteAccount() {
    try {
      const route = deleteAccountServerRoute(account.accountID);
      const response = await authenticatedRouter.delete(route);
      setAccount(response.data.account);
      setAuthenticatedData((prevState) => ({
        ...prevState,
        authenticated: false,
        accessToken: "",
        refreshToken: "",
      }));
      navigate("/");
    } catch (error) {
      Logger.error("::Error - @deleteAccount", error);
      return false;
    }
  }

  function clearAccount() {
    setAccount(null);
    setAuthenticatedData((prevState) => ({
      ...prevState,
      authenticated: false,
      accessToken: "",
      refreshToken: "",
    }));
    navigate("/");
  }

  return {
    account,
    fetchAccount,
    updateAccountPersonalInfo,
    updateAccountEmail,
    sendVerificationEmail,
    deactivateAccount,
    deleteAccount,
    clearAccount,
  };
}
