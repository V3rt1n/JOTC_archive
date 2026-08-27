<script setup>
import { data as events } from '../../events.data.ts'
import universes from '@data/universes.json'
</script>

# 多元宇宙 · 事件

与多元宇宙本身相关的事件。

<EntryGrid :items="events" universe="general" :universes="universes.universes" />
