import "./index.css"
import React from "react"
import ReactDOM from "react-dom/client"
import AppRouter from "./router/AppRouter"
import { AuthenticationContextProvider } from "./state/AuthenticationContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <AppRouter />
    </AuthenticationContextProvider>
  </React.StrictMode>,
)
