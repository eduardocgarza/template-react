import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AccountTopNav from "../navigations/AccountTopNav";
import { useAuthenticationContext } from "../../state/AuthenticationContext";
import { ResourcesContextProvider } from "../../state/ResourcesContext";


export default function AuthenticatedFilter() {
  const { authenticationData } = useAuthenticationContext();

  return authenticationData.authenticated ? (
    <ResourcesContextProvider>
      <section className="min-h-screen bg-gray-100">
        <AccountTopNav />
        <section className="relative top-[60px]">
          <Outlet />
        </section>
      </section>
    </ResourcesContextProvider>
  ) : (
    <Navigate to="/login" replace />
  );
}
