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

const POST_FIELDS_FRAGMENT = `
  id
  title
  excerpt
  content
  slug
  date
  featuredImage {
    node {
      sourceUrl
    }
  }
  categories {
    nodes {
      name
      slug
    }
  }
  author {
    node {
      name
      avatar {
        url
      }
    }
  }
`;

function formatWPPost(post: any): WordPressPost {
  return {
    ...post,
    // Ensure nested objects exist to prevent UI crashes
    featuredImage: post.featuredImage || undefined,
    author: {
      node: {
        name: post.author?.node?.name || "Sarath V Raj",
        avatar: {
          url: post.author?.node?.avatar?.url || "/images/authors/sarath.png"
        }
      }
    },
    categories: {
      nodes: post.categories?.nodes || []
    }
  };
}

export async function getAllPosts(): Promise<WordPressPost[]> {
  try {
    const data = await fetchGraphQL(`
      query AllPosts {
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            ${POST_FIELDS_FRAGMENT}
          }
        }
      }
    `);
    return (data?.posts?.nodes || []).map(formatWPPost);
  } catch (error) {
    console.error('WordPress Fetch Error (getAllPosts):', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const data = await fetchGraphQL(`
      query PostBySlug($id: ID!) {
        post(id: $id, idType: SLUG) {
          ${POST_FIELDS_FRAGMENT}
        }
      }
    `, { id: slug });

    if (!data?.post) return null;
    return formatWPPost(data.post);
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
    const data = await fetchGraphQL(`
      query PostsByCategory($categoryName: String!) {
        posts(first: 20, where: { categoryName: $categoryName, orderby: { field: DATE, order: DESC } }) {
          nodes {
            ${POST_FIELDS_FRAGMENT}
          }
        }
      }
    `, { categoryName: categorySlug });

    return (data?.posts?.nodes || []).map(formatWPPost);
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
    next: { revalidate: 60 },
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

export interface WordPressTestimonial {
  testimonialFields: {
    personName: string;
    personRole: string;
    testimonialText: string;
    rating: number;
    personImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    };
  };
}

export async function getTestimonials(): Promise<WordPressTestimonial[]> {
  try {
    const { data } = await client.query<{
      testimonials: {
        nodes: WordPressTestimonial[];
      };
    }>({
      query: gql`
        query Testimonials {
          testimonials {
            nodes {
              testimonialFields {
                personName
                personRole
                testimonialText
                rating
                personImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        }
      `,
      fetchPolicy: 'network-only',
    });

    return data?.testimonials?.nodes || [];
  } catch (error) {
    console.error('Apollo Fetch Error (getTestimonials):', error);
    return [];
  }
}

/**
 * Estimates the reading time of a piece of content.
 * Standard speed: 200 words per minute.
 */
export function estimateReadTime(content: string | undefined): string {
  if (!content || typeof content !== 'string') return "1 min read";
  try {
    // Remove HTML tags
    const text = content.replace(/<[^>]*>?/gm, '');

    // Count words
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;

    // Calculate minutes (minimum 1)
    const minutes = Math.max(1, Math.ceil(wordCount / 200));

    return `${minutes} min read`;
  } catch (e) {
    return "1 min read";
  }
}

