import { RiSettings3Line, RiUser3Line, RiDashboardLine } from "react-icons/ri";
import { MdOutlineAddBusiness } from "react-icons/md";

export const NavigationData = [
  {
    title: "Dashboard",
    icon: <RiDashboardLine className="h-6 w-6" />,
    link: "/dashboard",
  },
  {
    title: "Add Opening",
    icon: <MdOutlineAddBusiness className="h-6 w-6" />,
    link: "/add-opening",
  },
  {
    title: "Profile",
    icon: <RiUser3Line className="h-6 w-6" />,
    link: "/profile",
  },
  {
    title: "Settings",
    icon: <RiSettings3Line className="h-6 w-6" />,
    link: "/settings",
  },
];
