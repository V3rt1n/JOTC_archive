<script setup>
import { data as terms } from '../../glossary.data.ts'
import universes from '@data/universes.json'
</script>

# Mundus · 术语

尘世的术语，故事的主舞台。

<EntryGrid :items="terms" universe="mundus" :universes="universes.universes" />
