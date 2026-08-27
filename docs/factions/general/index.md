<script setup>
import { data as factions } from '../../factions.data.ts'
import universes from '@data/universes.json'
</script>

# 多元宇宙 · 势力

与多元宇宙本身相关的组织。

<EntryGrid :items="factions" universe="general" :universes="universes.universes" />
