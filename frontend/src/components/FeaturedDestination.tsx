"use client";
import { roomsDummyData } from "@/assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useRouter } from "next/navigation"; // ✅ FIXED


const FeaturedDestination = () => {
      const router = useRouter(); // ✅ works with App Router
    
    return (
        <div className="flex flex-col items-center px-2 md:px-6 lg:px-24 bg-slate-50 py-20">
            <Title
                title="Featured Destination"
                subtitle="Discover our handpicked Selection of exceptional around the world, offering  unparalleled luxury and unforgettable experiences."
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 mt-12">
                {roomsDummyData.slice(0, 8).map((room, index) => (
                    <HotelCard
                        key={room._id}
                        room={room}
                        index={index}
                    />
                ))}
            </div>
            <button onClick={() => router.push("/rooms")}
            className="my-16 px-4 py-2 text-sm front-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer">View All Destinations</button>
        </div>
    );
}

export default FeaturedDestination;
