import Image from "next/image";
import Title from "./Title";
import { testimonials } from "@/assets/assets";
import StarRating from "./StarRating";



const Review = () => {
  return (
    <div className="flex flex-col items-center px-2 md:px-6 lg:px-24 bg-slate-50 pt-20 pb-30">
      <Title
        title="Whats Our Guests Say"
        subtitle="Discover our handpicked Selection of exceptional around the world, offering unparalleled luxury and unforgettable experiences."
      />

      <div className="mt-15 flex flex-wrap items-center mx-4 justify-center gap-6">
        {testimonials.map((item)=>(
          <div key={item.id} className="text-sm w-100 border  border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-4 px-5 py-4 bg-red-500/10">
            <Image
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
              src={item.image}
              alt="userImage1"
            />
            <div>
              <h1 className="text-lg font-medium text-gray-800">{item.name}</h1>
              <p className="text-gray-800/80">{item.worker}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 pb-7">
            {/* Stars */}
            <div className="flex gap-0.5">
              <StarRating/>
            </div>

            {/* Review */}
            <p className="text-gray-500 mt-5">
              {item.review}
            </p>
          </div>
        </div>
        ))}
      </div>

    </div>


  );
}

export default Review;
