<script setup>
import { data as characters } from '../../characters.data.ts'
import universes from '@data/universes.json'
</script>

# 多元宇宙 · 角色

与多元宇宙本身相关的角色。

<EntryGrid :items="characters" universe="general" :universes="universes.universes" card="character" />
