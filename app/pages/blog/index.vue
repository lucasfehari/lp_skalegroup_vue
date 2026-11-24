<template>
  <div class="blog-page">
    <SiteHeader />

    <main>
      <section class="blog-hero">
        <div class="blog-shell blog-hero__inner">
          <span class="blog-eyebrow">Conteúdo para quem vive delivery</span>
          <h1>Estratégia que dá<br />pra usar na operação.</h1>
          <p>
            Marketing, CRM, tecnologia e IA explicados sem burocracia — com foco em
            mais pedidos, recorrência e margem.
          </p>
        </div>
      </section>

      <section class="blog-list" aria-labelledby="articles-title">
        <div class="blog-shell">
          <div class="blog-list__heading">
            <div>
              <span class="blog-eyebrow">Artigos recentes</span>
              <h2 id="articles-title">Direto ao ponto.</h2>
            </div>
            <p>{{ posts.length }} artigos publicados</p>
          </div>

          <div class="blog-grid">
            <BlogCard v-for="post in posts" :key="post.slug" :post="post" />
          </div>
        </div>
      </section>

      <section class="blog-cta">
        <div class="blog-shell blog-cta__inner">
          <div>
            <span class="blog-eyebrow blog-eyebrow--light">Próximo passo</span>
            <h2>Quer aplicar isso no seu delivery?</h2>
          </div>
          <NuxtLink to="/#form-section" class="blog-button">
            Falar com especialista <span aria-hidden="true">↗</span>
          </NuxtLink>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
const { posts } = useBlog()

useSeoMeta({
  title: 'Blog | Skale Digital',
  description: 'Conteúdo prático sobre marketing, CRM, tecnologia e IA para restaurantes e delivery.',
  ogTitle: 'Blog Skale Digital',
  ogDescription: 'Estratégia prática para vender mais no delivery.',
})
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: var(--bg);
  color: var(--white);
}

.blog-shell {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding-right: 2rem;
  padding-left: 2rem;
}

.blog-hero {
  position: relative;
  overflow: hidden;
  padding: 12rem 0 7rem;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(145deg, #1b090d 0%, #110c0d 42%, var(--bg) 100%);
}

.blog-hero__inner {
  position: relative;
  z-index: 1;
}

.blog-eyebrow {
  color: var(--red-bright);
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.blog-hero h1 {
  max-width: 900px;
  margin: 1rem 0 1.4rem;
  color: var(--white);
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 7vw, 6.8rem);
  line-height: 0.94;
  letter-spacing: -0.055em;
}

.blog-hero p {
  max-width: 620px;
  margin: 0;
  color: var(--grey);
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  line-height: 1.65;
}

.blog-list {
  padding: var(--section-gap) 0;
}

.blog-list__heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-list__heading h2,
.blog-cta h2 {
  margin: 0.7rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  line-height: 1;
  letter-spacing: -0.04em;
}

.blog-list__heading > p {
  margin: 0;
  color: var(--grey-dark);
  font-size: 0.8rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.blog-cta {
  padding: 4.5rem 0;
  background: var(--red);
}

.blog-cta__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.blog-eyebrow--light {
  color: rgba(255, 255, 255, 0.72);
}

.blog-button {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 1.4rem;
  border-radius: 999px;
  background: var(--white);
  color: var(--red-deep);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
}

@media (max-width: 900px) {
  .blog-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 680px) {
  .blog-shell {
    padding-right: 1.25rem;
    padding-left: 1.25rem;
  }

  .blog-hero {
    padding: 9rem 0 5rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }

  .blog-list__heading,
  .blog-cta__inner {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
