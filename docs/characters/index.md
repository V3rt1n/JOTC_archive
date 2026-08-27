<script setup>
import { data as characters } from '../characters.data.ts'
import universes from '@data/universes.json'
</script>

# 角色总览

按**界域**浏览角色：每个界域拥有独立的角色页面。新增角色时，将词条放入 `characters/<界域>/` 目录并在 Frontmatter 填写 `universe` 字段即可。

<UniversePortal :items="characters" :universes="universes.universes" base="/characters" />
