## WordPress Integration

This portfolio is integrated with WordPress via GraphQL. 

### Prerequisites
- WordPress installation with **WPGraphQL** and **ACF** plugins.
- See [WORDPRESS_SETUP.md](./WORDPRESS_SETUP.md) for detailed configuration steps.

### Environment Variables
Create a `.env.local` file in the root directory:
```env
WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
```

### GitHub Deployment
The site is configured for **GitHub Pages** deployment using static export. 
1. Ensure `output: "export"` is set in `next.config.ts`.
2. Add `WORDPRESS_API_URL` and `GOOGLE_GENERATIVE_AI_API_KEY` to your GitHub Repository Secrets.

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [WPGraphQL Documentation](https://www.wpgraphql.com/)
