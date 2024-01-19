<template>
  <CommandBtnListTrackedVue
    :button-list="alignmentButtons"
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

function getCmdHandlerSetTextAlign (align: string) {
  return (): boolean => runEditorFocusChain(editor).setTextAlign(align).run()
}

function getCheckIfActive (align: string) {
  return (editor: Editor): boolean => editor.isActive({ textAlign: align })
}

const alignmentButtons: Array<WithCheckIfActive<CommandBtnProps>> = [
  {
    name: 'align-left',
    tooltip: 'Align left',
    commandHandler: getCmdHandlerSetTextAlign('left'),
    icon: 'fas fa-align-left',
    isActive: false,
    checkIfActive: getCheckIfActive('left')
  },
  {
    name: 'align-center',
    tooltip: 'Align center',
    commandHandler: getCmdHandlerSetTextAlign('center'),
    icon: 'fas fa-align-center',
    isActive: false,
    checkIfActive: getCheckIfActive('center')
  },
  {
    name: 'align-right',
    tooltip: 'Align right',
    commandHandler: getCmdHandlerSetTextAlign('right'),
    icon: 'fas fa-align-right',
    isActive: false,
    checkIfActive: getCheckIfActive('right')
  },
  {
    name: 'align-justify',
    tooltip: 'Align justify',
    commandHandler: getCmdHandlerSetTextAlign('justify'),
    icon: 'fas fa-align-justify',
    isActive: false,
    checkIfActive: getCheckIfActive('justify')
  }
]
</script>
