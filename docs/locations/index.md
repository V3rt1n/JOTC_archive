<script setup>
import { data as locations } from '../locations.data.ts'
import universes from '@data/universes.json'
</script>

# 地点总览

按**界域**浏览地点：每个界域拥有独立的地点页面。新增地点时，将词条放入 `locations/<界域>/` 目录并在 Frontmatter 填写 `universe` 字段即可。

<UniversePortal :items="locations" :universes="universes.universes" base="/locations" />
