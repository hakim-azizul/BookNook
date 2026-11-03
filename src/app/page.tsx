import type { Metadata } from "next";
import FeatureSection from "./Components/Home/FeatureSection";
import HeroSlider from "./Components/Home/HeroSlider";
import NewArraivals from "./Components/Home/NewArraivals";

export const metadata: Metadata = {
  title: "Home | Read, Share & Borrow Books",
  description:
    "Welcome to BookNook. Explore community-contributed books, borrow titles instantly, and discover your next great read.",
};

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <NewArraivals />
      <FeatureSection />
    </div>
  );
}
