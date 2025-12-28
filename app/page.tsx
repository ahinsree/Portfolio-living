import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import BlogGrid from "@/components/BlogGrid";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { getAllPosts, getHomePageData } from "@/lib/wordpress";

export default async function Home() {
  const [posts, homeData] = await Promise.all([
    getAllPosts().catch(() => []),
    getHomePageData().catch(() => null)
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FeatureGrid />
        <BlogGrid posts={posts} title={homeData?.latestInsightsTitle} />
        <VideoSection title={homeData?.watchLearnTitle} />
        <Testimonials />
        <Newsletter
          heading={homeData?.subscribeHeading}
          text={homeData?.subscribeText}
          cta={homeData?.newsletterCta}
        />
      </main>
      <Footer />
    </div>
  );
}

