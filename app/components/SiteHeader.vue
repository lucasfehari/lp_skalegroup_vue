<template>
  <header class="site-header" :class="{ 'site-header--hidden': !isVisible }">
    <div class="site-shell site-header__inner">
      <NuxtLink to="/" class="site-header__logo" aria-label="Skale Digital — início">
        <img src="/logo_skale.svg" alt="Skale Digital" />
      </NuxtLink>

      <nav class="site-header__nav" aria-label="Menu principal">
        <NuxtLink to="/#sistema-skale" class="site-header__link">Sistema Skale</NuxtLink>
        <NuxtLink to="/#cases" class="site-header__link">Cases</NuxtLink>
        <NuxtLink to="/blog" class="site-header__link">Blog</NuxtLink>
        <NuxtLink to="/#form-section" class="site-header__cta">
          Falar com especialista
          <span aria-hidden="true">↗</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isVisible = ref(true)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY
  isVisible.value = currentScrollY <= lastScrollY || currentScrollY < 96
  lastScrollY = currentScrollY
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 1rem;
  left: 50%;
  z-index: 100;
  width: min(calc(100% - 2rem), var(--container));
  transform: translateX(-50%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(17, 17, 17, 0.72);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(18px);
  transition: transform var(--ease-smooth), opacity var(--ease-smooth);
}

.site-header--hidden {
  transform: translate(-50%, calc(-100% - 2rem));
  opacity: 0;
}

.site-shell {
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 2rem;
}

.site-header__inner {
  display: flex;
  min-height: 66px;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.site-header__logo img {
  width: auto;
  height: 44px;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.site-header__link {
  color: var(--grey);
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  transition: color var(--ease-fast);
}

.site-header__link:hover,
.site-header__link.router-link-active {
  color: var(--white);
}

.site-header__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.72rem 1.15rem;
  border-radius: 999px;
  background: var(--red);
  color: var(--white);
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 700;
  transition: background var(--ease-fast), transform var(--ease-fast);
}

.site-header__cta:hover {
  background: var(--red-bright);
  transform: translateY(-1px);
}

@media (max-width: 760px) {
  .site-header {
    top: 0.65rem;
    width: calc(100% - 1rem);
  }

  .site-shell {
    padding: 0 1rem;
  }

  .site-header__inner {
    min-height: 58px;
  }

  .site-header__logo img {
    height: 38px;
  }

  .site-header__link {
    display: none;
  }

  .site-header__cta {
    padding: 0.65rem 0.9rem;
    font-size: 0.76rem;
  }
}
</style>
