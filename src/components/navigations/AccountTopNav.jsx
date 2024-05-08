import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../state/AuthenticationContext";
import pandaIcon from "../../assets/panda.png";
import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon,
  TableCellsIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const navStyle =
  "flex items-center justify-center flex-col py-1 text-gray-600 hover:text-gray-900 text-xs w-[80px]";
const iconStyles = "block w-5 h-5 mb-1";

const routes = [
  {
    routePath: "/",
    routeName: "Messages",
    routeIcon: <ChatBubbleBottomCenterTextIcon className={iconStyles} />,
  },
  {
    routePath: "/lists",
    routeName: "Lists",
    routeIcon: <TableCellsIcon className={iconStyles} />,
  },
  {
    routePath: "/account",
    routeName: "Account",
    routeIcon: <UserIcon className={iconStyles} />,
  },
];

export default function AccountTopNav() {
  const { executeAppLogout } = useAuthenticationContext();
  const location = useLocation();
  const navigate = useNavigate();

  async function handleLogout() {
    await executeAppLogout();
    navigate("/");
  }

  return (
    <div className="z-10 fixed top-0 left-0 h-[60px] w-full bg-white border-b border-b-gray-300 px-4 py-1 flex justify-center">
      <ul className="flex items-center">
        <a
          href="https://hello.copypanda.co"
          className="w-[50px] h-[50px] flex items-center justify-center"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={pandaIcon}
            alt="Copy Panda Logo"
            className="block w-[40px] h-[40px] hover:w-[50px] hover:h-[50px] cursor-pointer duration-500 ease-in-out mr-4"
          />
        </a>
        {routes.map((route) => {
          const conditionalNavStyle = `${navStyle} ${
            location.pathname === route.routePath
              ? "text-gray-900"
              : "text-gray-600 transition duration-500 ease-in-out hover:text-gray-900"
          }`;
          return (
            <Link
              className={conditionalNavStyle}
              to={route.routePath}
              key={route.routePath}
            >
              {route.routeIcon}
              <span className="block">{route.routeName}</span>
            </Link>
          );
        })}
        <button className={navStyle} onClick={handleLogout}>
          <ArrowLeftOnRectangleIcon className={iconStyles} />
          <span className="block">Log out</span>
        </button>
      </ul>
    </div>
  );
}
