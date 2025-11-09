"use client";

import Link from "next/link";
import { assets, cities, navLinks } from "@/assets/assets";
import { useClerk, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Header = () => {
  const { openSignIn } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, router, isOwner, setShowHotelReg } = useAppContext();

  return (
    <div className="bg-blue-900 py-6 lg:h-50 relative">
      <div className="container mx-auto flex justify-between">
        <span className="text-white text-3xl font-bold">Booking</span>
        <span className="hidden lg:flex justify-between gap-3">
          <Link
            href="/"
            className="flex items-center hover:bg-white/10 hover:rounded-full px-4 font-bold text-white"
          >
            Home
          </Link>
          <Link
            href="/rooms"
            className="flex items-center hover:bg-white/10 hover:rounded-full px-4 font-bold text-white"
          >
            Hotels
          </Link>
          <Link
            href="/experience"
            className="flex items-center hover:bg-white/10 hover:rounded-full px-4 font-bold text-white"
          >
            Experience
          </Link>
          <Link
            href="/about"
            className="flex items-center hover:bg-white/10 hover:rounded-full px-4 font-bold text-white"
          >
            About
          </Link>
          {user && (
            <Link
              href={isOwner ? "/owner" : "/"} 
              onClick={(e) => {
                if (!isOwner) {
                  e.preventDefault(); 
                  setShowHotelReg(true); 
                }
              }}
              className="flex items-center hover:bg-white mr-8 hover:text-blue-900 px-4 font-bold text-white border border-white rounded-full"
            >
              {isOwner ? "Dashboard" : "List your Hotel"}
            </Link>
          )}
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => router.push("/my-bookings")} // ✅ works now
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <Link
              onClick={openSignIn}
              href="/"
              className="flex items-center rounded-md bg-white px-4 font-bold text-blue-900"
            >
              Login
            </Link>
          )}


        </span>
        {/* Mobile Menu */}
        <div className="lg:hidden flex justify-between items-center gap-4">
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => router.push("/my-bookings")} // ✅ works now
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <Link
              onClick={openSignIn}
              href="/"
              className="flex items-center rounded-md bg-white px-4 font-bold text-blue-900"
            >
              Login
            </Link>
          )}
          <div className=" lg:hidden w-6 h-6 text-white">
            <Image
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              src={assets.menuIcon}
              alt="logo"
              width={100}
              height={100}
              className="w-6px h-6 text-white cursor-pointer"
            />

          </div>
        </div>



        <div className={`fixed top-0 left-0 w-[70%] h-screen bg-white text-base flex flex-col lg:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {navLinks.map((link, i) => (
            <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.title}
            </a>
          ))}

          {user && <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all" onClick={() => isOwner ? router.push("/owner") : setShowHotelReg(false)}>
            {isOwner ? 'Dashboard' : 'List your Hotel'}
          </button>}

          {!user && <button
            onClick={openSignIn}
            href="/"
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer">
            Login
          </button>}
        </div>
      </div>

      {/* rest of your form unchanged */}
      <div className="hidden lg:block absolute top-56 lg:top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 container mx-auto ">
        <form className="bg-white text-gray-500 rounded-lg px-6 py-2  flex justify-center flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
          <div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                />
              </svg>
              <label htmlFor="destinationInput">Destination</label>
            </div>
            <input
              list="destinations"
              id="destinationInput"
              type="text"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              placeholder="Type here"
              required
            />
            <datalist id="destinations">
              {cities.map((city, index) => (
                <option key={index}>{city}</option>
              ))}
            </datalist>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                />
              </svg>
              <label htmlFor="checkIn">Check in</label>
            </div>
            <input
              id="checkIn"
              type="date"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                />
              </svg>
              <label htmlFor="checkOut">Check out</label>
            </div>
            <input
              id="checkOut"
              type="date"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            />
          </div>

          <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
            <label htmlFor="guests">Guests</label>
            <input
              min={1}
              max={4}
              id="guests"
              type="number"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
              placeholder="0"
            />
          </div>

          <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
