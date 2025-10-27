import { assets } from "@/assets/assets"
import Image from "next/image";

const StarRating = ({ rating = 4 }) => {
    return (
        <>
            {Array(5).fill('').map((_, index) => (
                <Image className="w-4.5 h-4.5" src={rating > index ? assets.starIconFilled : assets.starIconOutlined} alt="" width={20} height={20} key={index} />
            ))}
        </>
    );
}

export default StarRating;
