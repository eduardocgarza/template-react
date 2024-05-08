const {
  VITE_CLIENT_ENV,
  VITE_SERVER_ENV,
  VITE_GOOGLE_AUTH_CLIENT_SECRET,
  VITE_GOOGLE_AUTH_CLIENT_ID,
} = (import.meta.env)


/**
 * @API
 */
export const DEV_BASE_URL = "http://localhost:5000";
export const PROD_BASE_URL = "https://api.copypanda.co";

export const BASE_URL = VITE_SERVER_ENV === "production" ? PROD_BASE_URL : DEV_BASE_URL;

/**
 * @Client
 */
export const APP_CLIENT_ENV = VITE_CLIENT_ENV || "development";

/**
 * @Google
 */
export const GOOGLE_AUTH_CLIENT_SECRET = VITE_GOOGLE_AUTH_CLIENT_SECRET || "";
export const GOOGLE_AUTH_CLIENT_ID = VITE_GOOGLE_AUTH_CLIENT_ID || "";
