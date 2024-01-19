<template>
  <SelectTrackedOptions
    name="text-format"
    :options="headingOptions"
    :size="size"
    :editor="editor"
    tooltip="Text format"
  />
</template>

<script setup lang="ts">
import { type Level } from '@tiptap/extension-heading'
import { type Editor } from '@tiptap/vue-3'
import {
  toRefs, type PropType 
} from 'vue'
import { type ComponentSize } from '../../enums'
import { runEditorFocusChain } from '../../utils'
import SelectTrackedOptions, { type OptionWithCheckIfActive } from './with-tracked-options.vue'

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

const toggleHeading = (level: Level): boolean => {
  return runEditorFocusChain(editor).toggleHeading({ level: level }).run()
}
const isHeadingActive = (level: Level, editor: Editor): boolean => {
  return editor.isActive('heading', { level: level })
}
const headingOptions: OptionWithCheckIfActive[] = [
  {
    name: 'none',
    title: 'Normal',
    commandHandler: () => runEditorFocusChain(editor).setParagraph().run(),
    checkIfActive: (editor: Editor): boolean => editor.isActive('paragraph')
  },
  {
    name: 'h2',
    title: 'Heading',
    commandHandler: () => toggleHeading(2),
    checkIfActive: (editor: Editor): boolean => isHeadingActive(2, editor)
  },
  {
    name: 'h3',
    title: 'Subheading',
    commandHandler: () => toggleHeading(3),
    checkIfActive: (editor: Editor): boolean => isHeadingActive(3, editor)
  },
  {
    name: 'h4',
    title: 'Subheading-2',
    commandHandler: () => toggleHeading(4),
    checkIfActive: (editor: Editor): boolean => isHeadingActive(4, editor)
  }
]
</script>
