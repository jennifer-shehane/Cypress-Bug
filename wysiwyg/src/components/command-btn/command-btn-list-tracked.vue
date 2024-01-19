<template>
  <CommandBtnList
    :buttons="buttonList"
    :active-button-names="activeButtons"
    :size="size"
    :on-click="onClick"
    :icon-set="iconSet"
  />    
</template>

<script setup lang="ts">
// This component is a wrapper around the CommandBtnList component.
// It tracks the active buttons and passes them to the CommandBtnList component.
// The active buttons are the buttons that are active in the current editor state.
// The active buttons are determined by the checkIfActive function of each button.

import { type Editor } from '@tiptap/vue-3'
import {
  computed, type Ref, toRefs, type PropType, type Component 
} from 'vue'
import type { ComponentSize } from '../../enums'
import { useFilterActive } from '../../hooks'
import type { WithCheckIfActive } from '../../types'
import CommandBtnList from './command-btn-list.vue'
import type { CommandBtnProps } from './types'
    

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true
  },
  buttonList: {
    type: Array as PropType<Array<WithCheckIfActive<CommandBtnProps>>>,
    required: true
  },
  size: {
    type: String as PropType<ComponentSize>,
    required: true
  },
  onClick: {
    type: Function as PropType<() => void>,
    required: false,
    default: null
  },
  iconSet: {
    type: Object as PropType<{ [key: string]: Component }>,
    required: false,
    default: null
  },
  listName: {
    type: String,
    required: false,
    default: ''
  }
})
const {
  editor, 
  buttonList 
} = toRefs(props)

const activeButtonsListRef: Ref<Array<WithCheckIfActive<CommandBtnProps>>> = useFilterActive(editor, buttonList)
const getName = (btn: { name: string }): string => btn.name
const activeButtons = computed(() => activeButtonsListRef.value.map(getName))
</script>
