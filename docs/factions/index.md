<script setup>
import { data as factions } from '../factions.data.ts'
import universes from '@data/universes.json'
</script>

# 势力总览

按**界域**浏览势力：每个界域拥有独立的势力页面。新增势力时，将词条放入 `factions/<界域>/` 目录并在 Frontmatter 填写 `universe` 字段即可。

<UniversePortal :items="factions" :universes="universes.universes" base="/factions" />
