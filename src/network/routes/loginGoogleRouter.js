import Logger from "../../constants/Logger";
import { publicRouter } from "../serverRouter";
import { loginGoogleServerRoute } from "../serverRoutes";

const defaultMessage =
  "There was an error with the server. Please try again later.";

export default async function loginGoogleRouter(formData) {
  try {
    const response = await publicRouter.post(loginGoogleServerRoute, formData);
    return [response.data];
  } catch (error) {
    Logger.error(error);
    return [null, error.response.data.error || defaultMessage];
  }
}
