import React from "react";
import HomePage from "../pages/PublicView/Home/HomePage";
import LoginPage from "../pages/PublicView/Login/LoginPage"
import SignupPage from "../pages/PublicView/Signup/SignupPage"
import AboutPage from "../pages/PublicView/About/AboutPage";
import ContactPage from "../pages/PublicView/Contact/ContactPage";
import TermsPagePage from "../pages/PublicView/Terms/TermsPage";
import PrivacyPage from "../pages/PublicView/Privacy/PrivacyPage";
import NotFoundPage from "../pages/PublicView/NotFound/NotFoundPage";
import SettingsPage from "../pages/AccountView/Settings/SettingsPage";
import ProductsPage from "../pages/AccountView/Products/ProductsPage";
import DashboardPage from "../pages/AccountView/Dashboard/DashboardPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAuthenticationContext } from "../state/AuthenticationContext";
import AuthenticatedFilter from "../components/filters/AuthenticatedFilter";
import ProductItemPage from "../pages/AccountView/ProductItem/ProductItem";
import ProductsWrapperWrapper from "../components/wrappers/ProductsWrapper";
import UnauthenticatedFilter from "../components/filters/UnauthenticatedFilter";
import ResetPasswordPage from "../pages/PublicView/ResetPassword/ResetPasswordPage";
import ForgotPasswordPage from "../pages/PublicView/ForgotPassword/ForgotPasswordPage"


export default function AppRouter() {
  const { appInitialized, authenticationData } = useAuthenticationContext();

  if (!appInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading ...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {!authenticationData.authenticated && (
          <Route path="/" element={<UnauthenticatedFilter />}>
            <Route path="" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="forgot" element={<ForgotPasswordPage />} />
            <Route path="reset/:token" element={<ResetPasswordPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPagePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        )}
        {authenticationData.authenticated && (
          <Route path="/" element={<AuthenticatedFilter />}>
            <Route path="" element={<DashboardPage />} />
            <Route path="products" element={<ProductsWrapperWrapper />}>
              <Route path="" element={<ProductsPage />} />
              <Route path=":productUsername" element={<ProductItemPage />} />
            </Route>
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

