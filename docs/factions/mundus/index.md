<script setup>
import { data as factions } from '../../factions.data.ts'
import universes from '@data/universes.json'
</script>

# Mundus · 势力

尘世的势力，故事的主舞台。

<EntryGrid :items="factions" universe="mundus" :universes="universes.universes" />
