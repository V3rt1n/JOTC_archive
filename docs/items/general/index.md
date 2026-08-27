<script setup>
import { data as items } from '../../items.data.ts'
import universes from '@data/universes.json'
</script>

# 多元宇宙 · 物品

与多元宇宙本身相关的物品。

<EntryGrid :items="items" universe="general" :universes="universes.universes" />
