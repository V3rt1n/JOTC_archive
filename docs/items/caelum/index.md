<script setup>
import { data as items } from '../../items.data.ts'
import universes from '@data/universes.json'
</script>

# Caelum · 物品

天穹之界的物品。

<EntryGrid :items="items" universe="caelum" :universes="universes.universes" />
