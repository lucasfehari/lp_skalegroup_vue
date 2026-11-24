<template>
  <NuxtLink :to="`/blog/${post.slug}`" class="blog-card">
    <div class="blog-card__art" :data-category="post.category" aria-hidden="true">
      <span>{{ post.category }}</span>
    </div>

    <div class="blog-card__content">
      <div class="blog-card__meta">
        <span>{{ formatPostDate(post.publishedAt) }}</span>
        <span>{{ post.readingMinutes }} min</span>
      </div>
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt }}</p>
      <span class="blog-card__link">Ler artigo <span aria-hidden="true">↗</span></span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

defineProps<{ post: BlogPost }>()
const { formatPostDate } = useBlog()
</script>

<style scoped>
.blog-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--bg-card);
  transition: transform var(--ease-smooth), border-color var(--ease-fast);
}

.blog-card:hover {
  transform: translateY(-5px);
  border-color: var(--border-red);
}

.blog-card__art {
  position: relative;
  min-height: 180px;
  overflow: hidden;
  padding: 1.25rem;
  background: linear-gradient(135deg, var(--red-deep), #16080b 72%);
}

.blog-card__art::after {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  content: '';
  mask-image: linear-gradient(to bottom right, black, transparent 72%);
}

.blog-card__art > span {
  position: relative;
  z-index: 2;
  display: inline-flex;
  padding: 0.45rem 0.7rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.18);
  color: var(--off-white);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}

.blog-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.6rem;
}

.blog-card__meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  color: var(--grey-dark);
  font-size: 0.72rem;
  text-transform: capitalize;
}

.blog-card h3 {
  margin: 0 0 0.8rem;
  color: var(--white);
  font-family: var(--font-display);
  font-size: 1.3rem;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.blog-card p {
  margin: 0 0 1.5rem;
  color: var(--grey);
  font-size: 0.9rem;
  line-height: 1.65;
}

.blog-card__link {
  margin-top: auto;
  color: var(--red-bright);
  font-size: 0.82rem;
  font-weight: 700;
}
</style>
