<template>
  <SelectTrackedOptions
    name="font-size"
    :options="fontSizeOptions"
    :size="size"
    :editor="editor"
    tooltip="Font size"
  />
</template>

<script setup lang="ts">
import { type Editor } from '@tiptap/vue-3'
import {
  toRefs, type PropType 
} from 'vue'
import { type ComponentSize } from '../../enums'
import { runEditorFocusChain } from '../../utils'
import SelectTrackedOptions from './with-tracked-options.vue'

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true
  },
  size: {
    type: String as PropType<ComponentSize>,
    required: true
  }
})
const { editor } = toRefs(props)

const fontSizeOptions = [
  '8pt',
  '9pt',
  '10pt',
  '12pt',
  '14pt',
  '16pt',
  '18pt',
  '24pt',
  '30pt',
  '36pt',
  '48pt',
  '60pt',
  '72pt'
].map(fontSize => ({
  name: fontSize == '' ? 'none' : fontSize,
  title: fontSize,
  commandHandler: () => runEditorFocusChain(editor).setFontSize(fontSize).run(),
  checkIfActive: (editor: Editor): boolean => editor.isActive('textStyle', { fontSize })
}))
</script>
