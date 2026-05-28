import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HeroSection } from "./sections/HeroSection";
import { FeaturePhoto } from "./sections/FeaturePhoto";
import { FeatureText } from "./sections/FeatureText";
import { KeyFeatures } from "./sections/KeyFeatures";
import { HowItWorks } from "./sections/HowItWorks";
import { UseCases } from "./sections/UseCases";
import { FAQ } from "./sections/FAQ";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturePhoto />
        <FeatureText />
        <KeyFeatures />
        <HowItWorks />
        <UseCases />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
