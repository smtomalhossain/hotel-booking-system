import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between px-4 md:px-8 bg-blue-900 py-5  transition-all duration-300">
            <Link className="text-white text-3xl font-bold" href="/" >
                Booking
            </Link>
            <UserButton/>

        </div>
    );
}

export default Navbar;
