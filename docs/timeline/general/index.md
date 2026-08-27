<script setup>
import timeline from '@data/timeline.json'
import universes from '@data/universes.json'
</script>

# 多元宇宙 · 时间线

与多元宇宙本身相关的事件。这类事件的时间无法与其他界域对应，标注为不可考。

<TimelineView :events="timeline.universes.general.events" :universes="universes.universes" />
