<script setup>
import { data as events } from '../../events.data.ts'
import universes from '@data/universes.json'
</script>

# Mundus · 事件

尘世的事件，故事的主舞台。

<EntryGrid :items="events" universe="mundus" :universes="universes.universes" />
