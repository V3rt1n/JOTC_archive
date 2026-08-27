<script setup>
import timeline from '@data/timeline.json'
import universes from '@data/universes.json'
</script>

# Finis · 时间线

终末之界的事件时间线，与其它界域的时间无法对应。

<TimelineView :events="timeline.universes.finis.events" :universes="universes.universes" />
