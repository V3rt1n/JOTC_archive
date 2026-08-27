<script setup>
import { data as terms } from '../../glossary.data.ts'
import universes from '@data/universes.json'
</script>

# Caelum · 术语

天穹之界的术语。

<EntryGrid :items="terms" universe="caelum" :universes="universes.universes" />
