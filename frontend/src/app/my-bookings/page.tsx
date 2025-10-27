"use client";
import { assets, userBookingsDummyData } from "@/assets/assets";
import Title from "@/components/Title";
import Image from "next/image";
import { useState } from "react";

const Page = () => {

 const [bookings, setBookings] = useState(userBookingsDummyData);

 return (
  <div className="py-28 md:pb-35 md:pt-8 px-4 md:px-16 lg:px-24 xl:px-32">
   <Title
    aling="left"
    title="My Booking"
    subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
   />

   <div className="max-w-6xl mt-8 w-full text-gray-800">

    <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
     <div className="w-1/3">Hotels</div>
     <div className="w-1/3">Date & Timings</div>
     <div className="w-1/3">Payment</div>
    </div>

    {bookings.map((booking) => (
     <div key={booking._id} className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t">
      {/* Hotel Details */}
      <div className="flex flex-col md:flex-row">
       <Image src={booking.room.images[0]} alt="hotel-image" className="lg:w-44 w-full rounded shadow object-cover" width={100} height={100} loading="lazy" />

       <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
        <p className="font-playfair text-2xl">{booking.hotel.name}
         <span className="font-inter text-sm">{booking.room.roomType}</span>
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
         <Image src={assets.locationIcon} alt="location-icon" width={20} height={20} />
         <span>{booking.hotel.address}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
         <Image src={assets.guestsIcon} alt="guest-icon" width={20} height={20} />
         <span>{booking.guests}</span>
        </div>
        <p className="text-base">
         total: ${booking.totalPrice}
        </p>
       </div>
      </div>

      {/* Date & Timings */}
      <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8 ">
       <div className="m">
        <p>Check-In:</p>
        <p className="text-gray-500 text-sm">
         {new Date(booking.checkInDate).toDateString()}
        </p>
       </div>
       <div className="">
        <p>Check-Out:</p>
        <p className="text-gray-500 text-sm">
         {new Date(booking.checkOutDate).toDateString()}
        </p>
       </div>
      </div>

      {/* Payment Status */}
      <div className="flex flex-col items-start justify-center pt-3">
       <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>
        <p className={`text-sm ${booking.isPaid ? "text-green-500" : "text-red-500"}`}>
         {booking.isPaid ? "Paid" : "Unpaid"}
        </p>
       </div>
       {!booking.isPaid && (
        <button className="px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer">Pay Now</button>
       )}
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}

export default Page;
