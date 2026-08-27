<script setup>
import { data as characters } from '../../characters.data.ts'
import universes from '@data/universes.json'
</script>

# Anima · 角色

世界 Anima 的角色。

<EntryGrid :items="characters" universe="anima" :universes="universes.universes" card="character" />
