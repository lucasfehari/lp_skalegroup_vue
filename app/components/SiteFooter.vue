<template>
  <footer class="site-footer">
    <div class="site-shell site-footer__top">
      <div>
        <NuxtLink to="/" class="site-footer__logo" aria-label="Skale Digital — início">
          <img src="/logo_skale.svg" alt="Skale Digital" />
        </NuxtLink>
        <p>Marketing, tecnologia e automação para delivery vender mais.</p>
      </div>

      <nav class="site-footer__nav" aria-label="Links do rodapé">
        <NuxtLink to="/#sistema-skale">Sistema Skale</NuxtLink>
        <NuxtLink to="/#cases">Cases</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
        <NuxtLink to="/#form-section">Contato</NuxtLink>
      </nav>
    </div>

    <div class="site-shell site-footer__bottom">
      <p>© 2026 Skale Digital Assessoria de Marketing Ltda.</p>
      <p>Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  background: #080808;
}

.site-shell {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding-right: 2rem;
  padding-left: 2rem;
}

.site-footer__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
}

.site-footer__logo img {
  width: auto;
  height: 48px;
  margin-bottom: 1rem;
}

.site-footer__top p {
  max-width: 420px;
  margin: 0;
  color: var(--grey);
  font-size: 0.9rem;
}

.site-footer__nav {
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  gap: 0.75rem 2.5rem;
  color: var(--grey);
  font-size: 0.88rem;
}

.site-footer__nav a:hover {
  color: var(--white);
}

.site-footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.25rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid var(--border);
  color: var(--grey-dark);
  font-size: 0.74rem;
}

.site-footer__bottom p {
  margin: 0;
}

@media (max-width: 680px) {
  .site-shell {
    padding-right: 1.25rem;
    padding-left: 1.25rem;
  }

  .site-footer__top,
  .site-footer__bottom {
    flex-direction: column;
  }
}
</style>
