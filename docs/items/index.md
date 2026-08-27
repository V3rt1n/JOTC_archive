<script setup>
import { data as items } from '../items.data.ts'
import universes from '@data/universes.json'
</script>

# 物品总览

按**界域**浏览物品：每个界域拥有独立的物品页面。新增物品时，将词条放入 `items/<界域>/` 目录并在 Frontmatter 填写 `universe` 字段即可。

<UniversePortal :items="items" :universes="universes.universes" base="/items" />
