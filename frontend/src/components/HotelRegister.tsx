import { assets, cities } from "@/assets/assets";
import Image from "next/image";

const HotelRegister = () => {
 return (
  <div className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70">
   <form className="flex bg-white rounded-xl lg:w-4xl  max-md:mx-2">
    <Image src={assets.regImage}
     height={600} width={190}
     alt="reg-image" className="w-1/2 rounded-xl hidden md:block" />
    <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
     <Image src={assets.closeIcon}
      className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
      alt="close-icon" width={20} height={20} />
     <p className="text-2xl font-semibold mt-6">Resister Your Hotel</p>

     {/* Hotel Name */}
     <div className="w-full mt-4">
      <label htmlFor="name" className="font-medium text-gray-500">Hotel Name</label>
      <input type="text" id="name" placeholder="Enter your hotel name"
       className="border border-gray-200 rounded w-full px-3 py-2.5 mt--1 outline-indigo-50 font-light" required />
     </div>

     {/* Phone Number */}
     <div className="w-full mt-4">
      <label htmlFor="concat" className="font-medium text-gray-500">Phone</label>
      <input type="text" id="concat" placeholder="Enter your phone number"
       className="border border-gray-200 rounded w-full px-3 py-2.5 mt--1 outline-indigo-50 font-light" required />
     </div>

     {/* Address */}
     <div className="w-full mt-4">
      <label htmlFor="address" className="font-medium text-gray-500">Address</label>
      <input type="text-area" id="address" placeholder="Type your address"
       className="border border-gray-200 rounded w-full px-3 py-5 mt--1 outline-indigo-50 font-light placeholder:top-1" required />
     </div>

     {/* Select City Drop Down */}
     <div className="w-full mt-4 max-w-60 mr-auto">
      <label htmlFor="city" className="font-medium text-gray-500">City</label>
      <select id="city" className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-50 font-light">
       <option value="">Select City</option>
       {cities.map((city) => (
        <option key={city} value={city}>{city}</option>
       ))}
      </select>
     </div>

     {/* Submit Button */}
     <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white px-6 py-2 mt-6 rounded " >Resister</button>
    </div>
   </form>
  </div>
 );
}

export default HotelRegister;
