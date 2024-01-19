<template>
  <v-btn-toggle
    multiple
    divided
    variant="outlined"
    :border="true"
  >
    <CommandBtn
      v-for="btn in buttons"
      :key="btn.name"
      :name="btn.name"
      :command-handler="onClick ?? btn.commandHandler"
      :size="size"
      :tooltip="btn.tooltip"
      :is-active="useBtnActiveStrategy || btn.useBtnActiveStrategy ? activeButtonNames.includes(btn.name) : false"
      :is-disabled="useBtnActiveStrategy|| btn.useBtnActiveStrategy ? false : !activeButtonNames.includes(btn.name)"
    >
      <v-icon 
        v-if="!iconSet || !iconSet[btn.icon]" 
        :size="size"
      >
        {{ btn.icon }}
      </v-icon>
      <component
        :is="iconSet[btn.icon]"
        v-else
        :size="size"
      />
    </CommandBtn>
  </v-btn-toggle>    
</template>

<script setup lang="ts">
import {
  defineProps, type PropType, toRefs, type Component 
} from 'vue'
import CommandBtn from './command-btn-with-tooltip.vue'
import type { CommandBtnProps } from './types'

const props = defineProps({
  // The list of command buttons to be rendered
  buttons: {
    type: Array as PropType<CommandBtnProps[]>,
    required: true
  },
  // The size of the command buttons and their icons
  size: {
    type: String,
    required: true
  },
  // The names of the command buttons that are active
  activeButtonNames: {
    type: Array as PropType<string[]>,
    required: true
  },
  // A flag indicating whether the command buttons should be highlighted when active
  // or disabled when inactive
  useBtnActiveStrategy: {
    type: Boolean,
    required: false,
    default: false
  },
  // The function that will be called when a command button is clicked
  onClick: {
    type: Function as PropType<() => void>,
    required: false,
    default: null
  },
  // The icon set to use for the command buttons. 
  // The keys are the icon names and the values are the icon components.
  // Button icon names are matched to the keys.
  iconSet: {
    type: Object as PropType<{ [key: string]: Component }>,
    required: false,
    default: null
  }
})

const { activeButtonNames } = toRefs(props)
</script>

