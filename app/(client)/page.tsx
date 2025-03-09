import FeaturesSection from "@/components/blocks/features";
import Hero from "@/components/blocks/hero/hero";
import MainFeatures from "@/components/blocks/main-features";
import Pricing from "@/components/blocks/pricing";
import CallToAction from "@/components/blocks/call-to-action";
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <MainFeatures />
      <FeaturesSection />
      <Pricing />
      <CallToAction />
    </div>
  );
}
