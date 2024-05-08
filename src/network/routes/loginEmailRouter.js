import Logger from "../../constants/Logger";
import { publicRouter } from "../serverRouter";
import { loginEmailServerRoute } from "../serverRoutes";

const defaultMessage =
  "There was an error with the server. Please try again later.";

export default async function loginEmailRouter(formData) {
  try {
    const response = await publicRouter.post(loginEmailServerRoute, formData);
    return [response.data];
  } catch (error) {
    Logger.error(error);
    return [null, error.response.data.error || defaultMessage];
  }
}
