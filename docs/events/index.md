<script setup>
import { data as events } from '../events.data.ts'
import universes from '@data/universes.json'
</script>

# 事件总览

按**界域**浏览事件：每个界域拥有独立的事件页面。各界域时间线相互独立，见[时间线总览](/timeline/)。新增事件时，将词条放入 `events/<界域>/` 目录并在 Frontmatter 填写 `universe` 字段即可。

<UniversePortal :items="events" :universes="universes.universes" base="/events" />
