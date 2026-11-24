<template>
  <div v-if="post" class="article-page">
    <SiteHeader />

    <main>
      <article>
        <header class="article-hero">
          <div class="article-shell article-shell--narrow">
            <NuxtLink to="/blog" class="article-back">← Voltar para o blog</NuxtLink>
            <span class="article-category">{{ post.category }}</span>
            <h1>{{ post.title }}</h1>
            <p class="article-lead">{{ post.excerpt }}</p>
            <div class="article-meta">
              <span>{{ formatPostDate(post.publishedAt) }}</span>
              <span>{{ post.readingMinutes }} min de leitura</span>
            </div>
          </div>

        </header>

        <div class="article-shell article-shell--narrow article-body">
          <template v-for="(block, index) in post.content" :key="`${block.type}-${index}`">
            <p v-if="block.type === 'paragraph'">{{ block.text }}</p>
            <h2 v-else-if="block.type === 'heading'">{{ block.text }}</h2>
            <ul v-else-if="block.type === 'list'">
              <li v-for="item in block.items" :key="item">{{ item }}</li>
            </ul>
            <blockquote v-else-if="block.type === 'quote'">{{ block.text }}</blockquote>
          </template>
        </div>
      </article>

      <section class="article-cta">
        <div class="article-shell article-shell--narrow article-cta__inner">
          <div>
            <span>Quer trazer esse sistema para a sua operação?</span>
            <h2>Venda mais. A Skale cuida do resto.</h2>
          </div>
          <NuxtLink to="/#form-section" class="article-button">Falar com especialista ↗</NuxtLink>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getPostBySlug, formatPostDate } = useBlog()
const post = computed(() => getPostBySlug(String(route.params.slug)))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artigo não encontrado' })
}

useSeoMeta({
  title: () => post.value?.seoTitle ?? `${post.value?.title} | Skale Digital`,
  description: () => post.value?.seoDescription ?? post.value?.excerpt,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.excerpt,
  ogType: 'article',
})
</script>

<style scoped>
.article-page {
  min-height: 100vh;
  background: var(--off-white);
  color: #171111;
}

.article-shell {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding-right: 2rem;
  padding-left: 2rem;
}

.article-shell--narrow {
  max-width: 860px;
}

.article-hero {
  position: relative;
  overflow: hidden;
  padding: 11rem 0 6rem;
  background: linear-gradient(150deg, #1b090d 0%, #120c0e 48%, #0b0b0b 100%);
  color: var(--white);
}

.article-hero > .article-shell {
  position: relative;
  z-index: 2;
}

.article-back {
  display: block;
  width: fit-content;
  margin-bottom: 3rem;
  color: var(--grey);
  font-size: 0.8rem;
}

.article-category {
  color: var(--red-bright);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.article-hero h1 {
  max-width: 820px;
  margin: 1rem 0 1.5rem;
  color: var(--white);
  font-family: var(--font-display);
  font-size: clamp(2.9rem, 6vw, 5.7rem);
  line-height: 0.98;
  letter-spacing: -0.052em;
}

.article-lead {
  max-width: 720px;
  margin: 0;
  color: var(--grey);
  font-size: clamp(1rem, 1.5vw, 1.18rem);
  line-height: 1.65;
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  color: var(--grey-dark);
  font-size: 0.75rem;
  text-transform: capitalize;
}

.article-body {
  padding-top: 5rem;
  padding-bottom: 6rem;
}

.article-body p,
.article-body li {
  color: #44383b;
  font-size: 1.08rem;
  line-height: 1.85;
}

.article-body p {
  margin: 0 0 1.8rem;
}

.article-body h2 {
  margin: 3.5rem 0 1.25rem;
  color: #171111;
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3vw, 2.7rem);
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.article-body ul {
  display: grid;
  gap: 0.9rem;
  margin: 0 0 2rem;
  padding-left: 1.4rem;
}

.article-body li::marker {
  color: var(--red);
}

.article-body blockquote {
  margin: 3.5rem 0;
  padding: 1.5rem 0 1.5rem 2rem;
  border-left: 4px solid var(--red);
  color: var(--red-deep);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.025em;
}

.article-cta {
  padding: 4.5rem 0;
  background: var(--red);
  color: var(--white);
}

.article-cta__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.article-cta span {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.article-cta h2 {
  margin: 0.65rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1;
  letter-spacing: -0.04em;
}

.article-button {
  flex-shrink: 0;
  padding: 1rem 1.35rem;
  border-radius: 999px;
  background: var(--white);
  color: var(--red-deep);
  font-size: 0.86rem;
  font-weight: 700;
}

@media (max-width: 680px) {
  .article-shell {
    padding-right: 1.25rem;
    padding-left: 1.25rem;
  }

  .article-hero {
    padding: 9rem 0 4.5rem;
  }

  .article-cta__inner {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
