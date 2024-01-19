<template>
  <CommandBtnListTrackedVue
    :button-list="formattingButtons"
    :editor="editor"
    :size="size"
    use-btn-active-strategy
  />    
</template>

<script setup lang="ts">
import { type Editor } from '@tiptap/vue-3'
import {
  toRefs, type PropType 
} from 'vue'
import { type ComponentSize } from '../../enums'
import type { WithCheckIfActive } from '../../types'
import { runEditorFocusChain } from '../../utils'
import type { CommandBtnProps } from '../command-btn'
import { CommandBtnListTrackedVue } from '../command-btn'

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

const formattingButtons: Array<WithCheckIfActive<CommandBtnProps>> = [
  {
    name: 'bold',
    tooltip: 'Bold',
    commandHandler: () => runEditorFocusChain(editor).toggleBold().run(),
    icon: 'fas fa-bold',
    isActive: false,
    checkIfActive: (editor: Editor): boolean => editor.isActive('bold')
  },
  {
    name: 'italic',
    tooltip: 'Italic',
    commandHandler: () => runEditorFocusChain(editor).toggleItalic().run(),
    icon: 'fas fa-italic',
    isActive: false,
    checkIfActive: (editor: Editor): boolean => editor.isActive('italic')
  }
]
</script>
