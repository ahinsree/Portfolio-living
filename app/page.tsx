import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import BlogGrid from "@/components/BlogGrid";
import VideoSection from "@/components/VideoSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FeatureGrid />
        <BlogGrid />
        <VideoSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
