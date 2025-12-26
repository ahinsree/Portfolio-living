# WordPress Setup Guide for Portfolio Living

To fully integrate your WordPress CMS with this portfolio, follow these steps:

## 1. Required Plugins
Install and activate the following plugins on your WordPress site:
- **WPGraphQL**: The core GraphQL API for WordPress.
- **Advanced Custom Fields (ACF)**: To add custom metadata to categories and posts.
- **WPGraphQL for ACF**: Enables ACF fields in the GraphQL schema.
- **Custom Post Type UI (CPT UI)**: To create the "Videos" post type.

## 2. Configure "Videos" Post Type
Using CPT UI, create a new Post Type:
- **Post Type Slug**: `videos`
- **Plural Label**: `Videos`
- **Singular Label**: `Video`
- **Show in GraphQL**: True
- **GraphQL Single Name**: `video`
- **GraphQL Plural Name**: `videos`
- **Supports**: Title, Editor, Featured Image.

## 3. Configure ACF Field Groups

### A. Video Details (Apply to: Post Type = Video)
Create a field group named **Video Details** with the following fields:
- `videoUrl` (URL): The link to the YouTube/Vimeo video.
- `duration` (Text): e.g., "12:34".
- `playlistName` (Text): The name of the series this video belongs to.
- `playlistDescription` (Textarea): A short description of the series.

**GraphQL Field Name**: `videoDetails`

### B. Category Details (Apply to: Taxonomy = Category)
Create a field group named **Category Details** with the following fields:
- `headline` (Text): The large title shown on the category page.
- `philosophy` (Textarea): The core belief for this category.
- `iconName` (Select): Choose from `TrendingUp`, `MessageCircle`, `Briefcase`, `User`, `Cpu`.
- `colorClass` (Text): Tailwind text color class (e.g., `text-brand-blue`).
- `bgClass` (Text): Tailwind background color class (e.g., `bg-blue-50`).
- `serviceTitle` (Text): Title for the coaching highlight.
- `serviceDescription` (Textarea): Description for the coaching highlight.
- `serviceLink` (Text): Link to the service (default `/services#[slug]`).
- `relatedCategorySlug` (Text): Slug of a related category.
- `relatedMessage` (Textarea): Message for the cross-pollination section.

**GraphQL Field Name**: `categoryDetails`

## 4. Environment Variables
Add the following to your `.env.local` and your deployment environment (e.g., GitHub Secrets):
```env
WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
```

## 5. Deployment Note
Since this site uses **Static Site Generation (SSG)**, you must trigger a new build whenever you update content in WordPress for the changes to appear on the live site.
