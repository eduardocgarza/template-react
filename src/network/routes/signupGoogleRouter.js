import Logger from "../../constants/Logger";
import { publicRouter } from "../serverRouter";
import { signupGoogleServerRoute } from "../serverRoutes";

const defaultMessage =
  "There was an error with the server. Please try again later.";

export default async function signupGoogleRouter(formData) {
  try {
    const response = await publicRouter.post(signupGoogleServerRoute, formData);
    return [response.data, ""];
  } catch (error) {
    Logger.error(error);
    return [null, error.response.data.error || defaultMessage];
  }
}
