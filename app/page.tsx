import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import BlogGrid from "@/components/BlogGrid";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/wordpress";

export default async function Home() {
  const posts = await getAllPosts().catch(() => []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FeatureGrid />
        <BlogGrid posts={posts} />
        <VideoSection />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
