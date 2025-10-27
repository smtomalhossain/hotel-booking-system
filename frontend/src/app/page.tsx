import ExclusiveOffers from "@/components/ExclusiveOffers";
import FeaturedDestination from "@/components/FeaturedDestination";
import NewsLetter from "@/components/NewsLetter";
import Review from "@/components/Review";

export default function Home() {
  return (
    <>
      <div className="">
        <FeaturedDestination />
        <ExclusiveOffers />
        <Review />
        <NewsLetter/>
      </div>
    </>
  );
}
