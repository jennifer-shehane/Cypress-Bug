<template>
  <TableMenu
    :is-active="isTableActive"
    :size="size"
  >
    <template #activation-button="slotProps">
      <CommandBtnListTrackedVue
        :button-list="addNewTableButton"
        :editor="editor"
        :size="size"
        :on-click="isTableActive ? slotProps.onClick : addNewTableButton[0].commandHandler"
        use-btn-active-strategy
      />
    </template>
    <template #menu-items>
      <CommandBtnListTrackedVue
        :button-list="tableOperationButtons"
        :editor="editor"
        :size="size"
        :icon-set="iconSet"
      />
    </template>
  </TableMenu>   
</template>

<script setup lang="ts">
import { type Editor } from '@tiptap/vue-3'
import {
  ref, toRefs, type PropType 
} from 'vue'
import { type ComponentSize } from '../../enums'
import { useOnTransaction } from '../../hooks'
import type { WithCheckIfActive } from '../../types'
import { runEditorFocusChain } from '../../utils'
import type { CommandBtnProps } from '../command-btn'
import { CommandBtnListTrackedVue } from '../command-btn'
import * as Icons from '../icons'
import { TableMenu } from '../menu'

const iconSet = { ...Icons }
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

const addNewTableButton: Array<WithCheckIfActive<CommandBtnProps>> = [
  {
    name: 'table',
    tooltip: 'Table',
    commandHandler: () => runEditorFocusChain(editor).insertTable({
      rows: 3,
      cols: 3,
      withHeaderRow: false
    }).run(),
    icon: 'fas fa-table',
    isActive: false,
    useBtnActiveStrategy: true,
    checkIfActive: (editor: Editor): boolean => editor.can().addColumnBefore()
  }
]
    
const isTableActive = ref(false)
const onEditorTransactionHandler = (): void => {
  isTableActive.value = editor.value.isActive('table')
}
useOnTransaction(editor, onEditorTransactionHandler)

const tableOperationButtons = [
  ...addNewTableButton,
  {
    name: 'table-delete',
    commandHandler: () => runEditorFocusChain(editor).deleteTable().run(),
    icon: 'DeleteTable',
    tooltip: 'Delete table',
    isActive: true,
    checkIfActive: (editor: Editor): boolean => editor.can().addColumnBefore()
  },
  {
    name: 'table-column-add-left',
    commandHandler: () => runEditorFocusChain(editor).addColumnBefore().run(),
    icon: 'InsertColumnLeft',
    tooltip: 'Add column before',
    isActive: true,
    checkIfActive: (editor: Editor): boolean => editor.can().addColumnBefore()
  },
  {
    name: 'table-column-add-right',
    commandHandler: () => runEditorFocusChain(editor).addColumnAfter().run(),
    icon: 'InsertColumnRight',
    tooltip: 'Add column after',
    isActive: true,
    checkIfActive: (editor: Editor): boolean => editor.can().addColumnAfter()
  },
  {
    name: 'table-column-remove',
    commandHandler: () => runEditorFocusChain(editor).deleteColumn().run(),
    icon: 'DeleteColumn',
    tooltip: 'Delete column',
    isActive: true,
    checkIfActive: (editor: Editor): boolean => editor.can().deleteColumn()
  },
  {
    name: 'table-row-add-above',
    commandHandler: () => runEditorFocusChain(editor).addRowBefore().run(),
    icon: 'InsertRowAbove',
    tooltip: 'Add row before',
    isActive: true,
    checkIfActive: (editor: Editor): boolean => editor.can().addRowBefore()
  },
  {
    name: 'table-row-add-below',
    commandHandler: () => runEditorFocusChain(editor).addRowAfter().run(),
    icon: 'InsertRowBelow',
    tooltip: 'Add row after',
    isActive: true,
    checkIfActive: (editor: Editor): boolean => editor.can().addRowAfter()
  },
  {
    name: 'table-row-remove',
    commandHandler: () => runEditorFocusChain(editor).deleteRow().run(),
    icon: 'DeleteRow',
    tooltip: 'Delete row',
    isActive: true,
    checkIfActive: (editor: Editor): boolean => editor.can().deleteRow()
  },
  {
    name: 'table-cell-merge',
    commandHandler: () => runEditorFocusChain(editor).mergeCells().run(),
    icon: 'fas fa-grid-2-plus',
    tooltip: 'Merge cells',
    isActive: true,
    checkIfActive: (editor: Editor): boolean => editor.can().mergeCells()
  },
  {
    name: 'table-cell-split',
    commandHandler: () => runEditorFocusChain(editor).splitCell().run(),
    icon: 'fas <i fa-columns-3',
    tooltip: 'Split cells',
    isActive: true,
    checkIfActive: (editor: Editor): boolean => editor.can().splitCell()
  }
]
</script>
