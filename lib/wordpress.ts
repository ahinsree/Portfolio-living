import { gql } from "@apollo/client";
import { client } from "./apolloClient";

export interface WordPressPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  slug: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  author?: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count?: number;
  description?: string;
  acfFields?: {
    headline?: string;
    philosophy?: string;
    iconName?: string;
    colorClass?: string;
    bgClass?: string;
    serviceTitle?: string;
    serviceDescription?: string;
    serviceLink?: string;
    relatedCategorySlug?: string;
    relatedMessage?: string;
  };
}

export interface WordPressVideo {
  id: string;
  title: string;
  slug: string;
  content?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  videoFields?: {
    videoUrl: string;
    duration: string;
    playlistName: string;
    playlistDescription: string;
  };
}

const BASE_URL = 'https://cms.theportfolioliving.com/wp-json/wp/v2';

function mapPost(post: any): WordPressPost {
  return {
    id: post.id.toString(),
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content?.rendered,
    slug: post.slug,
    date: post.date,
    featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? {
      node: {
        sourceUrl: post._embedded['wp:featuredmedia'][0].source_url
      }
    } : undefined,
    categories: {
      nodes: post._embedded?.['wp:term']?.[0]?.map((term: any) => ({
        name: term.name,
        slug: term.slug
      })) || []
    },
    author: post._embedded?.['author']?.[0] ? {
      node: {
        name: post._embedded['author'][0].name || "Sarath V Raj",
        avatar: {
          url: post._embedded['author'][0].avatar_urls?.['96'] || "/images/authors/sarath.png"
        }
      }
    } : {
      node: {
        name: "Sarath V Raj",
        avatar: {
          url: "/images/authors/sarath.png"
        }
      }
    }
  };
}

export async function getAllPosts(): Promise<WordPressPost[]> {
  try {
    const res = await fetch(`${BASE_URL}/posts?_embed&per_page=20`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    const posts = await res.json();
    return posts.map(mapPost);
  } catch (error) {
    console.error('WordPress Fetch Error (getAllPosts):', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const res = await fetch(`${BASE_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Failed to fetch post');
    const posts = await res.json();
    if (posts.length === 0) return null;
    return mapPost(posts[0]);
  } catch (error) {
    console.error('WordPress Fetch Error (getPostBySlug):', error);
    return null;
  }
}

export async function getAllCategories(): Promise<WordPressCategory[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories?per_page=100`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const categories = await res.json();
    return categories.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count: cat.count,
      description: cat.description,
      acfFields: cat.acf // Assuming ACF to REST API is active
    }));
  } catch (error) {
    console.error('WordPress Fetch Error (getAllCategories):', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
  try {
    const res = await fetch(`${BASE_URL}/categories?slug=${slug}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Failed to fetch category');
    const categories = await res.json();
    if (categories.length === 0) return null;
    const cat = categories[0];
    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count: cat.count,
      description: cat.description,
      acfFields: cat.acf
    };
  } catch (error) {
    console.error('WordPress Fetch Error (getCategoryBySlug):', error);
    return null;
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<WordPressPost[]> {
  try {
    const category = await getCategoryBySlug(categorySlug);
    if (!category) return [];

    const res = await fetch(`${BASE_URL}/posts?categories=${category.id}&_embed&per_page=20`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Failed to fetch posts by category');
    const posts = await res.json();
    return posts.map(mapPost);
  } catch (error) {
    console.error('WordPress Fetch Error (getPostsByCategory):', error);
    return [];
  }
}

export async function getAllVideos(): Promise<WordPressVideo[]> {
  try {
    // Assuming 'videos' is a public custom post type in REST
    const res = await fetch(`${BASE_URL}/videos?_embed&per_page=50`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) {
      // If custom post type is not exposed or doesn't exist, return empty
      return [];
    }
    const videos = await res.json();
    return videos.map((video: any) => ({
      id: video.id.toString(),
      title: video.title.rendered,
      slug: video.slug,
      featuredImage: video._embedded?.['wp:featuredmedia']?.[0]?.source_url ? {
        node: {
          sourceUrl: video._embedded['wp:featuredmedia'][0].source_url
        }
      } : undefined,
      videoFields: video.acf || video.video_details // Map based on how ACF is exposed
    }));
  } catch (error) {
    console.error('WordPress Fetch Error (getAllVideos):', error);
    return [];
  }
}

export interface HomePageData {
  subscribeHeading: string;
  subscribeText: string;
  latestInsightsTitle?: string;
  watchLearnTitle?: string;
  newsletterCta?: string;
  insightsHeading?: string;
  insightsDescription?: string;
  watchLearnHeading?: string;
  newsletterHeading?: string;
  newsletterText?: string;
  newsletterButtonText?: string;
}

export async function getHomePage(): Promise<HomePageData | null> {
  try {
    const { data } = await client.query<{
      pageBy: {
        homeFields: HomePageData;
      };
    }>({
      query: gql`
        query HomePage {
          pageBy(uri: "home") {
            homeFields {
              subscribeHeading
              subscribeText
              insightsHeading
              insightsDescription
              watchLearnHeading
              newsletterHeading
              newsletterText
              newsletterButtonText
            }
          }
        }
      `,
    });

    return data?.pageBy?.homeFields || null;
  } catch (error) {
    console.error('Apollo Fetch Error (getHomePage):', error);
    return null;
  }
}

const GRAPHQL_URL = process.env.WORDPRESS_API_URL || 'https://cms.theportfolioliving.com/graphql';

async function fetchGraphQL(query: string, variables = {}) {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new Error('Failed to fetch GraphQL API');
  }
  return json.data;
}

export async function getHomePageData(): Promise<HomePageData | null> {
  try {
    const data = await fetchGraphQL(`
      query HomePage {
        pageBy(uri: "home") {
          homePageContent {
            subscribeHeading
            subscribeText
            latestInsightsTitle
            watchLearnTitle
            newsletterCta
          }
        }
      }
    `);

    return data?.pageBy?.homePageContent || null;
  } catch (error) {
    console.error('WordPress Fetch Error (getHomePageData):', error);
    return null;
  }
}

export interface WordPressService {
  title: string;
  slug: string;
  serviceFields: {
    serviceKey: string;
    heroTitle: string;
    shortIntro: string;
    sectionHeading: string;
    detailedContent: string;
    ctaHeading: string;
    ctaText: string;
    ctaLink: string;
    serviceIcon?: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export async function getAllServices(): Promise<WordPressService[]> {
  try {
    const data = await fetchGraphQL(`
      query ServicesPage {
        services(first: 20) {
          nodes {
            title
            slug
            serviceFields {
              serviceKey
              heroTitle
              shortIntro
              sectionHeading
              detailedContent
              ctaHeading
              ctaText
              ctaLink
            }
          }
        }
      }
    `);

    return data?.services?.nodes || [];
  } catch (error) {
    console.error('WordPress Fetch Error (getAllServices):', error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<WordPressService | null> {
  try {
    const data = await fetchGraphQL(`
      query ServiceBySlug($slug: ID!) {
        service(id: $slug, idType: SLUG) {
          title
          slug
          serviceFields {
            serviceKey
            heroTitle
            shortIntro
            sectionHeading
            detailedContent
            ctaHeading
            ctaText
            ctaLink
          }
        }
      }
    `, { slug });

    return data?.service || null;
  } catch (error) {
    console.error('WordPress Fetch Error (getServiceBySlug):', error);
    return null;
  }
}


