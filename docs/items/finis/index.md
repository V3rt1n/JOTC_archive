<script setup>
import { data as items } from '../../items.data.ts'
import universes from '@data/universes.json'
</script>

# Finis · 物品

终末之界的物品。

<EntryGrid :items="items" universe="finis" :universes="universes.universes" />
