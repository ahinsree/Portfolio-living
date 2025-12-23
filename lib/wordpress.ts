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
    name: string;
    slug: string;
    count?: number;
    description?: string;
    // Fields from ACF (if installed)
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

const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query: string, { variables }: { variables?: Record<string, unknown> } = {}) {
    type Headers = {
        'Content-Type': string;
        'Authorization'?: string;
    };

    const headers: Headers = { 'Content-Type': 'application/json' };

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
    }

    if (!API_URL) {
        console.warn('WORDPRESS_API_URL is not defined. Skipping fetch.');
        return null;
    }

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: headers as Record<string, string>,
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const json = await res.json();
        if (json.errors) {
            console.error(json.errors);
            return null;
        }
        return json.data;
    } catch (error) {
        console.error('WordPress Fetch Error:', error);
        return null;
    }
}

export async function getAllPosts(): Promise<WordPressPost[]> {
    const data = await fetchAPI(
        `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          excerpt
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
        }
      }
    }
  `
    );
    return data?.posts?.nodes || [];
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const data = await fetchAPI(
        `
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        id
        title
        content
        date
        slug
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
      }
    }
  `,
        {
            variables: {
                id: slug,
                idType: 'SLUG',
            },
        }
    );
    return data?.post;
}

export async function getAllCategories(): Promise<WordPressCategory[]> {
    const data = await fetchAPI(
        `
    query AllCategories {
      categories {
        nodes {
          name
          slug
          count
        }
      }
    }
  `
    );
    return data?.categories?.nodes || [];
}

export async function getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
    const data = await fetchAPI(
        `
    query CategoryBySlug($id: ID!, $idType: CategoryIdType!) {
      category(id: $id, idType: $idType) {
        name
        slug
        description
        # We assume ACF is used for these extra fields
        # If not using ACF, these will return null or need adjustment
        # Replace 'acfFields' with the actual field group name in your GraphQL schema
        acfFields: categoryDetails {
          headline
          philosophy
          iconName
          colorClass
          bgClass
          serviceTitle
          serviceDescription
          serviceLink
          relatedCategorySlug
          relatedMessage
        }
      }
    }
  `,
        {
            variables: {
                id: slug,
                idType: 'SLUG',
            },
        }
    );
    return data?.category;
}

export async function getPostsByCategory(categorySlug: string): Promise<WordPressPost[]> {
    const data = await fetchAPI(
        `
    query PostsByCategory($categoryName: String!) {
      posts(where: {categoryName: $categoryName}) {
        nodes {
          id
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `,
        {
            variables: {
                categoryName: categorySlug,
            },
        }
    );
    return data?.posts?.nodes || [];
}

export async function getAllVideos(): Promise<WordPressVideo[]> {
    const data = await fetchAPI(
        `
    query AllVideos {
      # Assuming a Custom Post Type called 'videos'
      videos(first: 50) {
        nodes {
          id
          title
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
          videoFields: videoDetails {
            videoUrl
            duration
            playlistName
            playlistDescription
          }
        }
      }
    }
  `
    );
    // If videos CPT doesn't exist, this might return null
    return data?.videos?.nodes || [];
}
