<template>
  <TooltipAttachedToHost
    :tooltip="tooltip"
    :name="name"
  >
    <template #activator="{ props: tooltipProps }">
      <v-select
        v-bind="tooltipProps"
        v-model="selectedOption"
        :name="nameDOMElement(name, ElementType.INPUT_ELEMENT)"
        hide-details
        single-line
        return-object
        item-text="title"
        item-value="name"
        density="compact"
        variant="outlined"
        open-text="opened"
        :bg-color="bgColor"
        :class="className"
        :items="options"
        :menu-props="{
          attach: appComponentElementOrNullRef, 
          modelValue: isMenuOpened,
          style: { 
            opacity: 1
          },
          scrim: 'white',
          location: 'bottom',
          contained: true,
          locationStrategy: 'connected',
          activatorProps: {
            name: nameDOMElement(name)
          },
          contentProps:{
            name: nameDOMElement(name, ElementType.SELECT_CONTAINER)
          }
        }"
        @update:menu="handleMenuStatusChanged"
      />
    </template>
  </TooltipAttachedToHost>
</template>

<script setup lang="ts">
import { type Editor } from '@tiptap/vue-3'
import {
  computed,
  ref, 
  toRefs,
  watch,
  type PropType
} from 'vue'
import { useTheme } from 'vuetify'
import { injectHostElementRef } from '../../di'
import { type ComponentSize } from '../../enums'
import { useFilterActive } from '../../hooks'
import { type WithCheckIfActive } from '../../types'
import {
  nameDOMElement, ElementType 
} from '../../utils'
import { TooltipAttachedToHost } from '../tooltip'

const appComponentElementOrNullRef = injectHostElementRef()

export type OptionWithCheckIfActive = WithCheckIfActive<{
  name: string
  title: string
  commandHandler: () => void
}>

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  editor: {
    type: Object as PropType<Editor>,
    required: true
  },
  size: {
    type: String as PropType<ComponentSize>,
    required: true
  },
  options: {
    type: Array as PropType<OptionWithCheckIfActive[]>,
    required: true
  },
  className: {
    type: String,
    default: '',
    required: false
  },
  tooltip: {
    type: String,
    default: '',
    required: false
  }
})
const {
  editor, 
  options 
} = toRefs(props)

const getDefaultOption = (): OptionWithCheckIfActive => options.value[0]
    
const isMenuOpened = ref(false)
// TODO: a "hack" that makes the "Select" component work inside a WebComponent Shadow DOM
// without it "clicking" on an option from the dropdown list won't change the selected value.
const handleMenuStatusChanged = (isOpened: boolean): void => {
  setTimeout(() => {
    isMenuOpened.value = isOpened
  }, 150)
}

const selectedOption = ref(getDefaultOption())
// TODO: @update:modelValue event isn't fired in the WC environment.
watch(selectedOption, (option: OptionWithCheckIfActive) => {
  if (!isMenuOpened.value) return
  isMenuOpened.value = false
  option.commandHandler()
})

const activeButtonsListRef = useFilterActive(editor, options)

watch(activeButtonsListRef, (activeFiltered) => {
  selectedOption.value = activeFiltered[0] ?? getDefaultOption()
})

const theme = useTheme()
const bgColor = computed(() => theme.current.value.colors.background)
</script>
