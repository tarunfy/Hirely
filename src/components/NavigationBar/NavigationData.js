import {
  RiSettings3Line,
  RiUser3Line,
  RiDashboardLine,
  RiFileList2Line,
} from "react-icons/ri";

export const NavigationData = [
  {
    title: "Dashboard",
    icon: <RiDashboardLine className="h-5 w-5" />,
    link: "/dashboard",
  },
  {
    title: "Applicants",
    icon: <RiFileList2Line className="h-5 w-5" />,
    link: "/applicants",
  },
  {
    title: "Profile",
    icon: <RiUser3Line className="h-5 w-5" />,
    link: "/profile",
  },
  {
    title: "Settings",
    icon: <RiSettings3Line className="h-5 w-5" />,
    link: "/settings",
  },
];
