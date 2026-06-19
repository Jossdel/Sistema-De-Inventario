import { IoHome, IoPeople, IoSettings } from "react-icons/io5";
import { IoIosPaper } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineMoveDown } from "react-icons/md";

interface SideBarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  classN: string;
}

export const sideBarData: SideBarItem[] = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <IoHome />,
    classN: "nav-text",
  },
  {
    title: "Products",
    path: "/products",
    icon: <AiFillProduct />,
    classN: "nav-text",
  },
  {
    title: "Categories",
    path: "/categories", // ← corregido
    icon: <BiSolidCategoryAlt />,
    classN: "nav-text",
  },
  {
    title: "Movements",
    path: "/movements",
    icon: <MdOutlineMoveDown />, // ← ícono propio
    classN: "nav-text",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <IoIosPaper />,
    classN: "nav-text",
  },
  {
    title: "Users",
    path: "/users",
    icon: <IoPeople />,
    classN: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoSettings />,
    classN: "nav-text",
  },
];

export const dataUser = {
  user: "Jose Enriques",
};
