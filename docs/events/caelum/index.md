<script setup>
import { data as events } from '../../events.data.ts'
import universes from '@data/universes.json'
</script>

# Caelum · 事件

天穹之界的事件。

<EntryGrid :items="events" universe="caelum" :universes="universes.universes" />
