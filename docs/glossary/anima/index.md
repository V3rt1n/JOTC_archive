<script setup>
import { data as terms } from '../../glossary.data.ts'
import universes from '@data/universes.json'
</script>

# Anima · 术语

世界 Anima 的术语。

<EntryGrid :items="terms" universe="anima" :universes="universes.universes" />
