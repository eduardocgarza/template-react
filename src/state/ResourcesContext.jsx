import React, { createContext, useContext } from "react";
import useAccount from "./hooks/useAccount";
import useLists from "./hooks/useLists";
import useMessages from "./hooks/useMessages";


const initialState = {};
const ResourcesContext = createContext(initialState);


export function ResourcesContextProvider(props) {
  const accountState = useAccount();
  const listsState = useLists();
  const messagesState = useMessages();

  function clearResources() {
    listsState.clearLists();
    messagesState.clearMessages();
  }

  const context = {
    accountState,
    listsState,
    messagesState,

    // Actions
    // fetchResources,
    clearResources,
  };

  return (
    <ResourcesContext.Provider value={context}>
      {props.children}
    </ResourcesContext.Provider>
  );
}

export function useResourcesContext() {
  return useContext(ResourcesContext);
}
