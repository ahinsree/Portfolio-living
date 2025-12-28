import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import BlogGrid from "@/components/BlogGrid";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { getAllPosts, getHomePage } from "@/lib/wordpress";

export default async function Home() {
  const [posts, homeData] = await Promise.all([
    getAllPosts().catch(() => []),
    getHomePage().catch(() => null)
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FeatureGrid />

        {/* Latest Insights */}
        <BlogGrid
          posts={posts}
          title={homeData?.insightsHeading || homeData?.latestInsightsTitle}
        />

        {/* Watch & Learn */}
        <VideoSection
          title={homeData?.watchLearnHeading || homeData?.watchLearnTitle}
        />

        <Testimonials />

        {/* Newsletter Section - Using the new newsletter fields */}
        <Newsletter
          heading={homeData?.newsletterHeading || homeData?.subscribeHeading}
          text={homeData?.newsletterText || homeData?.subscribeText}
          cta={homeData?.newsletterButtonText || homeData?.newsletterCta}
        />
      </main>
      <Footer />
    </div>
  );
}

