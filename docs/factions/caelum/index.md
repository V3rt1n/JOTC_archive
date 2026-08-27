<script setup>
import { data as factions } from '../../factions.data.ts'
import universes from '@data/universes.json'
</script>

# Caelum · 势力

天穹之界的势力。

<EntryGrid :items="factions" universe="caelum" :universes="universes.universes" />
