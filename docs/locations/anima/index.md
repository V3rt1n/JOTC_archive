<script setup>
import { data as locations } from '../../locations.data.ts'
import universes from '@data/universes.json'
</script>

# Anima · 地点

世界 Anima 的地点。

<EntryGrid :items="locations" universe="anima" :universes="universes.universes" />
