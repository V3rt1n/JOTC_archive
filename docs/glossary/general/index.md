<script setup>
import { data as terms } from '../../glossary.data.ts'
import universes from '@data/universes.json'
</script>

# 多元宇宙 · 术语

与多元宇宙本身相关的术语。

<EntryGrid :items="terms" universe="general" :universes="universes.universes" />
