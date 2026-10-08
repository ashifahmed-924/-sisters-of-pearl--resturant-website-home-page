import Navbar from "@/components/Navbar";
import HeroIntroStack from "@/components/HeroIntroStack";
import HeroEditorial from "@/components/HeroEditorial";
import PearlIntro from "@/components/PearlIntro";
import SignatureDishes from "@/components/SignatureDishes";
import MenuSection from "@/components/Menu/MenuSection";
import SeafoodMoment from "@/components/SeafoodMoment";
import LunchBanquet from "@/components/LunchBanquet";
import SeaLunchStack from "@/components/SeaLunchStack";
import DiningFilmStrip from "@/components/DiningFilmStrip";
import DiningExperience from "@/components/DiningExperience";
import DetailMosaic from "@/components/DetailMosaic";
import ReviewsWall from "@/components/ReviewsWall";
import HoursSection from "@/components/HoursSection";
import LocationPoster from "@/components/LocationPoster";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <HeroIntroStack>
          <HeroEditorial />
          <PearlIntro />
        </HeroIntroStack>
        <SignatureDishes />
        <MenuSection />
        <SeaLunchStack>
          <SeafoodMoment />
          <LunchBanquet />
        </SeaLunchStack>
        <DiningFilmStrip />
        <DiningExperience />
        <DetailMosaic />
        <ReviewsWall />
        <FinalCTA />
        <LocationPoster />
        <HoursSection />
      </main>
      <Footer />
    </>
  );
}
