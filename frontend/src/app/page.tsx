import ExclusiveOffers from "@/components/ExclusiveOffers";
import FeaturedDestination from "@/components/FeaturedDestination";
import NewsLetter from "@/components/NewsLetter";
import Review from "@/components/Review";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <div className="">
        <Toaster />
        <FeaturedDestination />
        <ExclusiveOffers />
        <Review />
        <NewsLetter />
      </div>
    </>
  );
}
