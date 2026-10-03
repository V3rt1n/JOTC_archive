<script setup lang="ts">
interface Portal {
  title: string
  desc: string
  link: string
  icon: string
  color: string
}

const portals: Portal[] = [
  { title: '角色', desc: '按界域浏览全部角色', link: '/characters/', icon: '🧑', color: '#6d4bd8' },
  { title: '地点', desc: '各界域的地理与场所', link: '/locations/', icon: '📍', color: '#2563eb' },
  { title: '势力', desc: '组织、教团与阵营', link: '/factions/', icon: '⚔️', color: '#b45309' },
  { title: '时间线', desc: '各界域独立编年', link: '/timeline/', icon: '🕰️', color: '#059669' },
  { title: '术语', desc: '界域、要素与概念', link: '/glossary/', icon: '📖', color: '#ec4899' },
]
</script>

<template>
  <div class="hp-wrap">
    <a
      v-for="p in portals"
      :key="p.link"
      class="hp-card"
      :href="p.link"
      :style="{ '--hp-color': p.color }"
    >
      <span class="hp-icon">{{ p.icon }}</span>
      <span class="hp-title">{{ p.title }}</span>
      <span class="hp-desc">{{ p.desc }}</span>
    </a>
  </div>
</template>

<style scoped>
.hp-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  max-width: 960px;
  margin: 8px auto 48px;
  padding: 0 24px;
}

.hp-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 22px 14px;
  border-radius: 18px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  text-decoration: none;
  color: inherit;
  text-align: center;
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.25s ease;
}

.hp-card:hover {
  transform: translateY(-5px);
  border-color: var(--hp-color);
  box-shadow: 0 14px 32px color-mix(in srgb, var(--hp-color) 28%, transparent);
}

.hp-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  font-size: 26px;
  line-height: 1;
  background: color-mix(in srgb, var(--hp-color) 14%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hp-color) 26%, transparent);
  transition: transform 0.22s ease, background 0.22s ease;
}

.hp-card:hover .hp-icon {
  transform: scale(1.08) rotate(-3deg);
  background: color-mix(in srgb, var(--hp-color) 22%, transparent);
}

.hp-title {
  font-size: 16.5px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: 0.02em;
}

.hp-desc {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .hp-wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
