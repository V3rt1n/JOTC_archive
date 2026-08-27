<script setup>
import { data as items } from '../../items.data.ts'
import universes from '@data/universes.json'
</script>

# Mundus · 物品

尘世的物品，故事的主舞台。

<EntryGrid :items="items" universe="mundus" :universes="universes.universes" />
