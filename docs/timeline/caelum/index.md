<script setup>
import timeline from '@data/timeline.json'
import universes from '@data/universes.json'
</script>

# Caelum · 时间线

天穹之界的事件时间线，与其它界域的时间无法对应。

<TimelineView :events="timeline.universes.caelum.events" :universes="universes.universes" />
