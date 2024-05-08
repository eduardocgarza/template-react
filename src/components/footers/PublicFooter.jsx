import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function PublicFooter() {
  const location = useLocation();
  const navStyle = "mx-2 text-xs hover:underline opacity-75";
  const privacyStyles = `${navStyle} ${
    location.pathname === "/privacy" ? "underline" : ""
  }`;
  const termsStyles = `${navStyle} ${
    location.pathname === "/terms" ? "underline" : ""
  }`;

  const email = "contact@copypanda.co";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
  };

  return (
    <footer className="flex flex-col sm:flex-row items-center justify-center py-4 bg-white border-t border-t-gray-300">
      <Link to="/privacy" className={privacyStyles}>
        Privacy
      </Link>
      <button className="my-4 sm:my-0 sm:mx-2 text-xs opacity-75" onClick={copyToClipboard}>
        {email}
      </button>
      <Link to="/terms" className={termsStyles}>
        Terms
      </Link>
    </footer>
  );
}
