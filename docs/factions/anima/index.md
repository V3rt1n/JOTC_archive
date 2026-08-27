<script setup>
import { data as factions } from '../../factions.data.ts'
import universes from '@data/universes.json'
</script>

# Anima · 势力

灵魂之界的势力。

<EntryGrid :items="factions" universe="anima" :universes="universes.universes" />
