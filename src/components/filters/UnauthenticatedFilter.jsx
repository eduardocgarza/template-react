import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PublicFooter from "../footers/PublicFooter";
import PublicTopNav from "../navigations/PublicTopNav";
import { useAuthenticationContext } from "../../state/AuthenticationContext";

export default function UnauthenticatedFilter() {
  const { authenticationData } = useAuthenticationContext();
  const location = useLocation();

  return !authenticationData.authenticated ? (
    <section className="flex flex-col min-h-screen">
      <PublicTopNav />
      <section className="flex-1 h-full flex flex-col">
        <Outlet />
      </section>
      <PublicFooter />
    </section>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
