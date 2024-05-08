

export default function useLocalStorage() {
  const ACCESS_TOKEN_NAME   = "access_token";
  const REFRESH_TOKEN_NAME  = "refresh_token";
  
  function updateTokensInStorage(session) {
    localStorage.setItem(ACCESS_TOKEN_NAME, session.accessToken);
    localStorage.setItem(REFRESH_TOKEN_NAME, session.refreshToken);
  }

  function getTokensFromStorage() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME);

    return { accessToken, refreshToken };
  }

  function removeTokensFromStorage() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    localStorage.removeItem(REFRESH_TOKEN_NAME);
  }

  return {
    getTokensFromStorage,
    updateTokensInStorage,
    removeTokensFromStorage,
  };
}

