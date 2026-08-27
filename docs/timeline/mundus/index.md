<script setup>
import timeline from '@data/timeline.json'
import universes from '@data/universes.json'
</script>

# Mundus · 时间线

尘世的事件时间线，使用 Mundus 自己的「星历」纪年，与其它界域的时间无法对应。

<TimelineView :events="timeline.universes.mundus.events" :universes="universes.universes" />
