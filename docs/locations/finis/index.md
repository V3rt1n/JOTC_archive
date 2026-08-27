<script setup>
import { data as locations } from '../../locations.data.ts'
import universes from '@data/universes.json'
</script>

# Finis · 地点

终末之界的地点。

<EntryGrid :items="locations" universe="finis" :universes="universes.universes" />
