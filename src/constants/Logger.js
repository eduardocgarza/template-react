import { APP_CLIENT_ENV } from "./appConstants";

const isDevelopment = APP_CLIENT_ENV === "development";

const Logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args);
    }
  },
};

export default Logger;
