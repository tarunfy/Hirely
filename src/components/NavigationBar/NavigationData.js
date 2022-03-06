import {
  RiSettings3Line,
  RiUser3Line,
  RiDashboardLine,
  RiFileList2Line,
} from "react-icons/ri";

export const NavigationData = [
  {
    title: "Dashboard",
    icon: <RiDashboardLine className="h-6 w-6" />,
    link: "/dashboard",
  },
  {
    title: "Applicants",
    icon: <RiFileList2Line className="h-6 w-6" />,
    link: "/applicants",
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
