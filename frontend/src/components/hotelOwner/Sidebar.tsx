"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const sideBarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Rooms", path: "/owner/add-room", icon: assets.addIcon },
    { name: "Room List", path: "/owner/room-list", icon: assets.listIcon },
  ];

  return (
    <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
      {sideBarLinks.map((link, index) => {
        const isActive = pathname === link.path; // active check

        return (
          <Link
            href={link.path}
            key={index}
            className={`flex items-center py-3 px-4 md:px-8 gap-3 ${
              isActive
                ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600"
                : "hover:bg-gray-100/90 border-white text-gray-700"
            }`}
          >
            <Image
              src={link.icon}
              alt={link.name}
              width={20}
              height={20}
              className="min-h-6 min-w-6"
            />
            <p className="md:block hidden text-center">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
