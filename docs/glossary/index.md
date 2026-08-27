<script setup>
import { data as terms } from '../glossary.data.ts'
import universes from '@data/universes.json'
</script>

# 术语总览

按**界域**浏览术语：每个界域拥有独立的术语页面。新增术语时，将词条放入 `glossary/<界域>/` 目录并在 Frontmatter 填写 `universe` 字段即可。

<UniversePortal :items="terms" :universes="universes.universes" base="/glossary" />
