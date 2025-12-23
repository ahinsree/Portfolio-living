const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
    type Headers = {
        'Content-Type': string;
        'Authorization'?: string;
    };

    const headers: Headers = { 'Content-Type': 'application/json' };

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
    }

    if (!API_URL) {
        throw new Error('WORDPRESS_API_URL is not defined in environment variables');
    }

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
        throw new Error('Failed to fetch API from WordPress');
    }
    return json.data;
}

export async function getAllPosts() {
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
    return data?.posts?.nodes;
}

export async function getPostBySlug(slug: string) {
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

export async function getAllCategories() {
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
    return data?.categories?.nodes;
}
