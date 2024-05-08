import { useEffect, useState } from "react";
import Logger from "../../constants/Logger";
import { useAuthenticationContext } from "../AuthenticationContext";
import {
  archiveMessageServerRoute,
  createMessageServerRoute,
  deleteMessageServerRoute,
  editMessageServerRoute,
  getMessagesServerRoute,
  unarchiveMessageServerRoute,
} from "../../network/serverRoutes";

export default function useMessages() {
  /**
   * @State
   */
  const [messages, setMessages] = useState([]);

  /**
   * @Hooks
   */
  const { authenticatedRouter } = useAuthenticationContext();

  /**
   * @Initialize
   */
  useEffect(() => {
    fetchMessages();
  }, []);

  /**
   * @Methods
   */
  async function fetchMessages() {
    try {
      const response = await authenticatedRouter.get(getMessagesServerRoute);
      setMessages(response.data);
    } catch (error) {
      Logger.error("::Error - @fetchMessages", error);
    }
  }

  async function archiveMessage(messageID) {
    try {
      const route = archiveMessageServerRoute(messageID);
      await authenticatedRouter.patch(route);
      const updatedMessages = messages.map((message) => {
        if (message.messageID === messageID) {
          return { ...message, isArchived: true };
        }
        return message;
      });
      setMessages(updatedMessages);
      return true;
    } catch (error) {
      Logger.error("::Error - @archiveMessage", error);
      return false;
    }
  }

  async function unarchiveMessage(messageID) {
    try {
      const route = unarchiveMessageServerRoute(messageID);
      await authenticatedRouter.patch(route);
      const updatedMessages = messages.map((message) => {
        if (message.messageID === messageID) {
          return { ...message, isArchived: false };
        }
        return message;
      });
      setMessages(updatedMessages);
      return true;
    } catch (error) {
      Logger.error("::Error - @unarchiveMessage", error);
      return false;
    }
  }

  async function deleteMessage(messageID) {
    try {
      const route = deleteMessageServerRoute(messageID);
      await authenticatedRouter.delete(route);
      const updatedMessages = messages.filter(
        (message) => message.messageID !== messageID
      );
      setMessages(updatedMessages);
      return true;
    } catch (error) {
      Logger.error("::Error - @deleteMessage", error);
      return false;
    }
  }

  async function createMessage(requestData) {
    try {
      const response = await authenticatedRouter.post(
        createMessageServerRoute,
        requestData
      );
      const newMessages = [...messages, response.data.message];
      setMessages(newMessages);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

  async function editMessage(requestData) {
    try {
      const route = editMessageServerRoute(requestData.messageID);
      const response = await authenticatedRouter.patch(route, requestData);
      const updatedMessages = messages.map((message) => {
        if (message.messageID === requestData.messageID) {
          return { ...message, ...response.data };
        }
        return message;
      });
      setMessages(updatedMessages);
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }

  function clearMessages() {
    setMessages([]);
  }

  return {
    messages,
    fetchMessages,
    archiveMessage,
    unarchiveMessage,
    deleteMessage,
    createMessage,
    editMessage,
    clearMessages,
  };
}
