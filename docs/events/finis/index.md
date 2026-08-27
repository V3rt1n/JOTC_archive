<script setup>
import { data as events } from '../../events.data.ts'
import universes from '@data/universes.json'
</script>

# Finis · 事件

终末之界的事件。

<EntryGrid :items="events" universe="finis" :universes="universes.universes" />
