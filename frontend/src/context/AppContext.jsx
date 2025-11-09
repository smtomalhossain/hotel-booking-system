"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ useRouter instead of useNavigate
import { useUser, useAuth } from "@clerk/nextjs"; // ✅ use @clerk/nextjs for Next.js
import { toast } from "react-hot-toast";

// ✅ Use process.env instead of import.meta.env
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "$";
  const router = useRouter(); // ✅ useRouter from Next.js
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);

  const fetchUser = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setSearchedCities(data.recentSearchedCities);
      } else {
        // Retry Fetching User Details after 5 seconds
        setTimeout(fetchUser, 5000);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch user details.");
    }
  };

  useEffect(() => {
    if (user) fetchUser();
  }, [user]);

  const value = {
    currency,
    router, // ✅ renamed navigate → router
    user,
    getToken,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
