import axios from "axios";
import { BASE_URL } from "../../constants/appConstants";
import { verifyRefreshTokenServerRoute } from "../serverRoutes";
import { useAuthenticationContext } from "../../state/AuthenticationContext";
import useLocalStorage from "../../state/hooks/useLocalStorage";

const authenticatedRouter = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

async function verifyRefreshToken(refreshToken) {
  const requestData = {
    refreshToken,
  };
  const response = await axios.post(verifyRefreshTokenServerRoute, requestData);
  return response.data;
}

export default function useAuthenticatedRouter() {
  const { setAuthenticatedData } = useAuthenticationContext();
  const localStorage = useLocalStorage();

  let requestInterceptor, responseInterceptor;

  async function addSession(accessToken) {
    requestInterceptor = authenticatedRouter.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    responseInterceptor = authenticatedRouter.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const previousRequest = error.config;
        if (error.response.status === 403 && !previousRequest.sent) {
          previousRequest.sent = true;
          try {
            const newSession = await verifyRefreshToken();
            const { accessToken: newAccessToken } = newSession;

            // 1. Update AuthenticationRouter (below)
            previousRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;

            // 2. Update AuthenticationContext
            setAuthenticatedData((prevState) => ({
              ...prevState,
              accessToken: newSession.accessToken,
              refreshToken: newSession.refreshToken,
            }));

            // 3. Update LocalStorage
            localStorage.updateTokensInStorage(newSession);
            return authenticatedRouter(previousRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }

        // For other errors, reject the promise
        return Promise.reject(error);
      }
    );
  }

  function removeSession() {
    authenticatedRouter.interceptors.request.eject(requestInterceptor);
    authenticatedRouter.interceptors.response.eject(responseInterceptor);
  }

  return { authenticatedRouter, addSession, removeSession };
}
