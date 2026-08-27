<script setup>
import { data as factions } from '../../factions.data.ts'
import universes from '@data/universes.json'
</script>

# Finis · 势力

终末之界的势力。

<EntryGrid :items="factions" universe="finis" :universes="universes.universes" />
