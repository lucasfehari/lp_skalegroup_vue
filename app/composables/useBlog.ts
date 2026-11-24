import type { BlogPost } from '~/types/blog'

const postModules = import.meta.glob('../content/blog/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, BlogPost>

const publishedPosts = Object.values(postModules)
  .filter((post) => !post.draft)
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

export const useBlog = () => {
  const posts = computed(() => publishedPosts)

  const featuredPost = computed(() =>
    publishedPosts.find((post) => post.featured) ?? publishedPosts[0],
  )

  const getPostBySlug = (slug: string) =>
    publishedPosts.find((post) => post.slug === slug)

  const formatPostDate = (date: string) =>
    new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date(`${date}T12:00:00-03:00`))

  return {
    posts,
    featuredPost,
    getPostBySlug,
    formatPostDate,
  }
}
