import { useEffect, useState } from "react";
import Logger from "../../constants/Logger";
import { useAuthenticationContext } from "../AuthenticationContext";
import {
  addMessagesToListServerRoute,
  archiveListServerRoute,
  createListServerRoute,
  deleteListServerRoute,
  editListServerRoute,
  getListsServerRoute,
  removeMessagesFromListServerRoute,
  unarchiveListServerRoute,
} from "../../network/serverRoutes";

export default function useLists() {
  /**
   * @State
   */
  const [lists, setLists] = useState([]);

  /**
   * @Hooks
   */
  const { authenticatedRouter } = useAuthenticationContext();

  /**
   * @Initialize
   */
  useEffect(() => {
    fetchLists();
  }, []);

  /**
   * @Methods
   *
   */
  async function fetchLists() {
    try {
      const response = await authenticatedRouter.get(getListsServerRoute);
      setLists(response.data);
    } catch (error) {
      Logger.error("Error - @fetchLists", error);
    }
  }

  async function createList(requestData) {
    try {
      const response = await authenticatedRouter.post(
        createListServerRoute,
        requestData
      );
      const updatedLists = [...lists, response.data];
      setLists(updatedLists);
      return true;
    } catch (error) {
      Logger.error("Error - @createList", error);
      return false;
    }
  }

  async function editList(requestData) {
    try {
      const route = editListServerRoute(requestData.listID);
      const response = await authenticatedRouter.patch(route, requestData);
      const updatedLists = lists.map((list) => {
        if (list.listID === requestData.listID) {
          return { ...list, ...response.data };
        }
        return list;
      });
      setLists(updatedLists);
      return true;
    } catch (error) {
      Logger.error("Error - @editList", error);
      return false;
    }
  }

  async function deleteList(listID) {
    try {
      const route = deleteListServerRoute(listID);
      await authenticatedRouter.delete(route);
      const updatedLists = lists.filter((list) => list.listID !== listID);
      setLists(updatedLists);
      return true;
    } catch (error) {
      Logger.error("Error - @deleteList", error);
      return false;
    }
  }

  function clearLists() {
    setLists([]);
  }

  async function archiveList(listID) {
    try {
      const route = archiveListServerRoute(listID);
      await authenticatedRouter.patch(route);
      const updatedLists = lists.map((list) => {
        if (list.listID === listID) {
          return { ...list, isArchived: true };
        }
        return list;
      });
      setLists(updatedLists);
      return true;
    } catch (error) {
      Logger.error("Error - @archiveList", error);
      return false;
    }
  }

  async function unarchiveList(listID) {
    try {
      const route = unarchiveListServerRoute(listID);
      await authenticatedRouter.patch(route);
      const updatedLists = lists.map((list) => {
        if (list.listID === listID) {
          return { ...list, isArchived: false };
        }
        return list;
      });
      setLists(updatedLists);
      return true;
    } catch (error) {
      Logger.error("Error - @unarchiveList", error);
      return false;
    }
  }

  async function addMessagesToList(listID, messages) {
    try {
      const route = addMessagesToListServerRoute(listID);
      const response = await authenticatedRouter.post(route, messages);
      const updatedLists = lists.map((list) => {
        if (list.listID === listID) {
          return { ...list, messages: response.data };
        }
        return list;
      });
      setLists(updatedLists);
      return true;
    } catch (error) {
      Logger.error("Error - @addMessagesToList", error);
    }
  }

  async function removeMessagesFromList(listID, messages) {
    try {
      const route = removeMessagesFromListServerRoute(listID);
      const response = await authenticatedRouter.post(route, messages);
      const updatedLists = lists.map((list) => {
        if (list.listID === listID) {
          return { ...list, messages: response.data };
        }
        return list;
      });
      setLists(updatedLists);
      return true;
    } catch (error) {
      Logger.error("Error - @removeMessagesFromList", error);
      return false;
    }
  }

  return {
    lists,
    fetchLists,
    createList,
    editList,
    deleteList,
    archiveList,
    unarchiveList,
    clearLists,
    addMessagesToList,
    removeMessagesFromList,
  };
}
