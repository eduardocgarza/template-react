/**
 * @Publicly
 */

import { BASE_URL } from "./appConstants";

// Indexed
export const homePageMetadata = {
  url: BASE_URL,
  title: "Copy Panda - Streamline Your Messaging with Ease!",
  description: "Create personalized message templates for quick generation.",
};

// Indexed
export const privacyPageMetadata = {
  url: `${BASE_URL}/privacy`,
  title: "Copy Panda - Privacy Policy",
  description:
    "Read our privacy policy to understand how we handle your information and protect your privacy.",
};

// Indexed
export const termsPageMetadata = {
  url: `${BASE_URL}/terms`,
  title: "Copy Panda - Terms of Service",
  description:
    "Review our terms of service to learn about the rules and guidelines for using Copy Panda.",
};

export const notFoundPageMetadata = {
  title: "Copy Panda - Page Not Found",
  description:
    "Oops! The page you're looking for could not be found. Please check the URL and try again.",
};

/**
 * @Authentication
 */

// Indexed
export const loginPageMetadata = {
  url: `${BASE_URL}/login`,
  title: "Copy Panda - Login to Your Account",
  description:
    "Log in to your Copy Panda account to access your personalized message templates and settings.",
};

// Indexed
export const signupPageMetadata = {
  url: `${BASE_URL}/signup`,
  title: "Copy Panda - Create Your Account",
  description:
    "Create a new account on Copy Panda and start streamlining your messaging with ease.",
};

// Indexed
export const forgotPasswordPageMetadata = {
  url: `${BASE_URL}/forgot`,
  title: "Copy Panda - Forgot Your Password?",
  description:
    "Recover your Copy Panda account by resetting your forgotten password.",
};

export const resetPasswordPageMetadata = {
  title: "Copy Panda - Reset Your Password",
  description:
    "Reset your Copy Panda account password to regain access to your account.",
};

export const verifyEmailPageMetadata = {
  title: "Copy Panda - Verify Your Email",
  description:
    "Verify your email address to complete the registration process and activate your Copy Panda account.",
};

/**
 * @Messages
 */
export const messagesPageMetadata = {
  title: "Copy Panda - My Messages",
  description:
    "Manage and organize your saved messages with Copy Panda's message management features.",
};

export const createMessagePageMetadata = {
  title: "Copy Panda - Create a New Message",
  description:
    "Create a new personalized message template in Copy Panda for quick and easy use.",
};

export const editMessagePageMetadata = {
  title: "Copy Panda - Edit Message",
  description:
    "Edit and update your existing message templates in Copy Panda for better customization.",
};

export const generateMessagesPageMetadata = {
  title: "Copy Panda - Generate Messages",
  description:
    "Generate multiple personalized messages based on your templates with Copy Panda's message generation feature.",
};

/**
 * @Lists
 */
export const listsOverviewPageMetadata = {
  title: "Copy Panda - Lists Overview",
  description:
    "Get an overview of your lists in Copy Panda and manage them efficiently for your messaging needs.",
};

export const createListItemPageMetadata = {
  title: "Copy Panda - Create a New List",
  description:
    "Create a new list in Copy Panda to organize your message templates and improve your workflow.",
};

export const editListItemPageMetadata = {
  title: "Copy Panda - Edit List",
  description:
    "Edit and customize your existing lists in Copy Panda for better organization and efficiency.",
};

export const listItemPageMetadata = (listName) => ({
  title: `Copy Panda - ${listName}`,
  description:
    "View the details of a specific list in Copy Panda, including its associated message templates.",
});

/**
 * @Account
 */
export const accountPageMetadata = {
  title: "Copy Panda - My Account",
  description:
    "Manage your Copy Panda account settings, including profile information and preferences.",
};
