"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Navbar from "./hotelOwner/Navbar";
// import HotelRegister from "./HotelRegister";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isOwnerPage = pathname.startsWith("/owner");

  return (
    <>
      {!isOwnerPage && <Header />}
      {/* If you want to conditionally render HotelRegister */}
      {/* {false && <HotelRegister />} */}
    </>
  );
}
