<script setup>
import timeline from '@data/timeline.json'
import universes from '@data/universes.json'
</script>

# Anima · 时间线

灵魂之界的事件时间线，与其它界域的时间无法对应。

<TimelineView :events="timeline.universes.anima.events" :universes="universes.universes" />
