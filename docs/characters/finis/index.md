<script setup>
import { data as characters } from '../../characters.data.ts'
import universes from '@data/universes.json'
</script>

# Finis · 角色

终末之界的角色。

<EntryGrid :items="characters" universe="finis" :universes="universes.universes" card="character" />
