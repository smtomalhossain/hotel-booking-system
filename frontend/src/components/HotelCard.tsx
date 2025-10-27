import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

interface HotelCardProps {
  room: any;
  index: number;
}

const HotelCard : React.FC<HotelCardProps> = ({ room, index }) => {
  return (

    <Link href={"rooms/" + room._id} onClick={() => window.scrollTo(0, 0)} key={room._id} className="relative mx-w-70 rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]">

      <Image src={room.images[0]} alt="" width={100} height={100} className="w-72 h-50 rounded-lg" />

      {index % 2 === 0 && <p className="px-3 py-2 absolute top-3 left-3 text-xs bg-white font-medium text-gray-800 rounded-full">Best Seller</p>}

      <div className="p-4 pt-5 ">
        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-medium text-gray-800">{room.hotel.name}</p>
          <div className="flex items-center gap-1">
            <Image src={assets.starIconFilled} alt="" width={20} height={20} /> 4.6
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Image src={assets.locationIcon} alt="" width={20} height={20} />
          <span className="">{room.hotel.address}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className=""> <span className="text-xl text-gray-800">${room.pricePerNight}</span>/night</p>
          <button className="px-4 py-2 text-sm front-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer">Book Now</button>
        </div>
      </div>
    </Link>

  );
}

export default HotelCard;
