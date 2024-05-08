import { BASE_URL as baseURL } from "../constants/appConstants";

/**
 *
 * @Authentication
 *
 */
export const loginGoogleServerRoute = `${baseURL}/authentication/login/google`;
export const loginEmailServerRoute = `${baseURL}/authentication/login/email`;

export const signupGoogleServerRoute = `${baseURL}/authentication/signup/google`;
export const signupEmailServerRoute = `${baseURL}/authentication/signup/email`;

export const forgotPasswordServerRoute = `${baseURL}/authentication/password/forgot`;

/**
 * @RefreshToken
 *  Uses the refresh token to get a new access token.
 */
export const verifyRefreshTokenServerRoute = `${baseURL}/authentication/token/refresh`;
export const logoutServerRoute = `${baseURL}/authentication/logout`;

export const resetPasswordServerRoute = `${baseURL}/authentication/password/reset`;

export const verifyResetPasswordTokenServerRoute = (resetToken) => {
  return `${baseURL}/authentication/password/reset/${resetToken}`;
};

export const sendVerificationEmailServerRoute = `${baseURL}/authentication/email-verification`;

export const verifyEmailServerRoute = (emailToken) => {
  return `${baseURL}/authentication/email-verification/${emailToken}`;
};

/**
 *
 * @Account
 *
 */
export const getAccountServerRoute = `${baseURL}/accounts`;

export const updateAccountEmailServerRoute = (accountID) => {
  return `${baseURL}/accounts/${accountID}/email`;
};

export const editAccountServerRoute = (accountID) => {
  return `${baseURL}/accounts/${accountID}/edit`;
};

export const deactivateAccountServerRoute = (accountID) => {
  return `${baseURL}/accounts/${accountID}/deactivate`;
};

export const deleteAccountServerRoute = (accountID) => {
  return `${baseURL}/accounts/${accountID}/delete`;
};

/**
 *
 * @Messages
 *
 */
export const createMessageServerRoute = `${baseURL}/messages`;
export const getMessagesServerRoute = `${baseURL}/messages`;

export const getMessageServerRoute = (messageID) => {
  return `${baseURL}/messages/${messageID}`;
};

export const editMessageServerRoute = (messageID) => {
  return `${baseURL}/messages/${messageID}`;
};

export const archiveMessageServerRoute = (messageID) => {
  return `${baseURL}/messages/${messageID}/archive`;
};

export const deleteMessageServerRoute = (messageID) => {
  return `${baseURL}/messages/${messageID}`;
};

export const unarchiveMessageServerRoute = (messageID) => {
  return `${baseURL}/messages/${messageID}/unarchive`;
};

/**
 *
 * @Lists
 *
 */
export const createListServerRoute = `${baseURL}/lists`;
export const getListsServerRoute = `${baseURL}/lists`;

export const getListServerRoute = (listID) => {
  return `${baseURL}/lists/${listID}`;
};

export const editListServerRoute = (listID) => {
  return `${baseURL}/lists/${listID}`;
};

export const archiveListServerRoute = (listID) => {
  return `${baseURL}/lists/${listID}/archive`;
};

export const deleteListServerRoute = (listID) => {
  return `${baseURL}/lists/${listID}`;
};

export const unarchiveListServerRoute = (listID) => {
  return `${baseURL}/lists/${listID}/unarchive`;
};

export const addMessagesToListServerRoute = (listID) => {
  return `${baseURL}/lists/${listID}/add`;
};

export const removeMessagesFromListServerRoute = (listID) => {
  return `${baseURL}/lists/${listID}/remove`;
};
