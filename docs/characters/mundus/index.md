<script setup>
import { data as characters } from '../../characters.data.ts'
import universes from '@data/universes.json'
</script>

# Mundus · 角色

尘世的角色，故事的主舞台。

<EntryGrid :items="characters" universe="mundus" :universes="universes.universes" card="character" />
