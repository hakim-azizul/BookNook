import FeatureSection from "./Components/Home/FeatureSection";
import HeroSlider from "./Components/Home/HeroSlider";
import NewArraivals from "./Components/Home/NewArraivals";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <NewArraivals />
      <FeatureSection />
    </div>
  );
}
