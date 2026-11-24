export default {
  scrollBehavior(to: { hash?: string }) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 96,
        behavior: 'smooth' as const,
      }
    }

    return { left: 0, top: 0 }
  },
}
