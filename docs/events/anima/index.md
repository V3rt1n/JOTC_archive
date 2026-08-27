<script setup>
import { data as events } from '../../events.data.ts'
import universes from '@data/universes.json'
</script>

# Anima · 事件

灵魂之界的事件。

<EntryGrid :items="events" universe="anima" :universes="universes.universes" />
