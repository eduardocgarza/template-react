import Logger from "../../constants/Logger";
import { publicRouter } from "../serverRouter";
import { signupEmailServerRoute } from "../serverRoutes";

const defaultMessage =
  "There was an error with the server. Please try again later.";

export default async function signupEmailRouter(formData) {
  try {
    const response = await publicRouter.post(signupEmailServerRoute, formData);
    return [response.data, ""];
  } catch (error) {
    Logger.error(error);
    return [null, error.response.data.error || defaultMessage];
  }
}
