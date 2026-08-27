<script setup>
import { data as locations } from '../../locations.data.ts'
import universes from '@data/universes.json'
</script>

# Caelum · 地点

天穹之界的地点。

<EntryGrid :items="locations" universe="caelum" :universes="universes.universes" />
