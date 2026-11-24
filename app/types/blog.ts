export type BlogContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  updatedAt?: string
  readingMinutes: number
  featured?: boolean
  draft?: boolean
  seoTitle?: string
  seoDescription?: string
  content: BlogContentBlock[]
}
