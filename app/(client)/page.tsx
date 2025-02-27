import FeaturesSection from "@/components/blocks/features";
import Hero from "@/components/blocks/hero";
import MainFeatures from "@/components/blocks/main-features";
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <MainFeatures />
      <FeaturesSection />
    </div>
  );
}
