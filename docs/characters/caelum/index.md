<script setup>
import { data as characters } from '../../characters.data.ts'
import universes from '@data/universes.json'
</script>

# Caelum · 角色

天穹之界的角色。

<EntryGrid :items="characters" universe="caelum" :universes="universes.universes" card="character" />
