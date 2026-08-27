<script setup>
import { data as locations } from '../../locations.data.ts'
import universes from '@data/universes.json'
</script>

# 多元宇宙 · 地点

与多元宇宙本身相关的地点。

<EntryGrid :items="locations" universe="general" :universes="universes.universes" />
