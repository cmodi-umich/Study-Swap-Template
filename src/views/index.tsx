import React from "react";

// Icon Imports
import {
  HomeRounded as HomeIcon,
  MessageRounded as ChatIcon,
} from "@material-ui/icons";

// View Component Imports
import Login from "./Login";
import Home from "./Home";
import Chat from "./Chat";
import Profile from "./Profile";
import SignUp from "./SignUp";

// Array of arrays in format "Name", ComponentIcon, "/route"
export const menuList = [
  ["Home", <HomeIcon></HomeIcon>, "/home"],
  ["Chats", <ChatIcon></ChatIcon>, "/chats"],
];

interface RouteType {
  path: string;
  component: any;
}
export const routes: Array<RouteType> = [
  { path: "/login", component: Login },
  { path: "/home", component: Home },
  { path: "/chat", component: Chat },
  { path: "/profile", component: Profile },
  { path: "/signup", component: SignUp },
];
