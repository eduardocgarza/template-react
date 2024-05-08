import React from "react";
import { Link, useLocation } from "react-router-dom";
import pandaIcon from "../../assets/panda.png";

export default function PublicTopNav() {
  const location = useLocation();
  const navStyle = "block text-gray-800 hover:underline mx-4 sm:mx-6 md:mx-10 text-sm";

  const loginStyles = `${navStyle} ${
    location.pathname === "/login"
      ? "underline"
      : "text-gray-600 underline-transition duration-500 ease-in-out hover:text-gray-900"
  }`;

  const signupStyles = `${navStyle} ${
    location.pathname === "/signup"
      ? "underline"
      : "text-gray-600 underline-transition duration-500 ease-in-out hover:text-gray-900"
  }`;

  return (
    <div className="h-[60px] w-full bg-white border-b border-b-gray-300 px-4 py-1 flex items-center justify-center">
      <Link className={loginStyles} to="/login">
        Login
      </Link>
      <Link
        to="/"
        className="w-[50px] h-[50px] flex items-center justify-center"
      >
        <img
          src={pandaIcon}
          alt="Copy Panda Logo"
          className="block w-[40px] h-[40px] hover:w-[50px] hover:h-[50px] cursor-pointer duration-500 ease-in-out mx-6"
        />
      </Link>
      <Link className={signupStyles} to="/signup">
        Signup
      </Link>
    </div>
  );
}
