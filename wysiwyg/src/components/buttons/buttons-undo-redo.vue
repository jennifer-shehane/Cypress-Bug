<template>
  <CommandBtnListTrackedVue
    :button-list="undoRedoButtons"
    :editor="editor"
    :size="size"
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

const undoRedoButtons: Array<WithCheckIfActive<CommandBtnProps>> = [
  {
    name: 'undo',
    tooltip: 'Undo',
    commandHandler: () => runEditorFocusChain(editor).undo().run(),
    icon: 'fas fa-undo',
    isActive: true,
    checkIfActive: (editor: Editor): boolean => editor.can().undo()
  },
  {
    name: 'redo',
    tooltip: 'Redo',
    commandHandler: () => runEditorFocusChain(editor).redo().run(),
    icon: 'fas fa-redo',
    isActive: true,
    checkIfActive: (editor: Editor): boolean => editor.can().redo()
  }
]
</script>
