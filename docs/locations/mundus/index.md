<script setup>
import { data as locations } from '../../locations.data.ts'
import universes from '@data/universes.json'
</script>

# Mundus · 地点

尘世的地点，故事的主舞台。

<EntryGrid :items="locations" universe="mundus" :universes="universes.universes" />
