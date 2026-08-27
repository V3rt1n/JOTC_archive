<script setup>
import { data as terms } from '../../glossary.data.ts'
import universes from '@data/universes.json'
</script>

# Finis · 术语

终末之界的术语。

<EntryGrid :items="terms" universe="finis" :universes="universes.universes" />
