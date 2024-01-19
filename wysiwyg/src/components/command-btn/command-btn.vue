<template>
  <v-btn
    density="compact"
    v-bind="$props"
    :name="buttonName"
    :value="name"
    :size="buttonSize"
    :active="isActive"
    :disabled="isDisabled"
    @click="commandHandler"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import { 
  computed,
  toRefs,
  type PropType
} from 'vue'
import type { Ref } from 'vue'
import { VBtn } from 'vuetify/components/VBtn'
import {
  ComponentSize, ViewportSize 
} from '../../enums'
import { useResponsiveComponentSize } from '../../hooks/responsive-component-size'
import { nameDOMElement } from '../../utils'
import type { CommandBtnProps } from './types'

const props = defineProps({
  // The props of the Vuetify3 VBtn component
  ...VBtn.props,
  // The name of the command button
  name: {
    type: String,
    required: true
  },
  // The function that will be called when the command button is clicked
  commandHandler: {
    type: Function as PropType<CommandBtnProps['commandHandler']>,
    required: true
  },
  // A flag indicating whether the command button is active and should be highlighted
  isActive: {
    type: Boolean as PropType<CommandBtnProps['isActive']>,
    required: false,
    default: false
  },
  // A flag indicating whether the command button is disabled and cannot be clicked
  isDisabled: {
    type: Boolean as PropType<CommandBtnProps['isDisabled']>,
    required: false,
    default: false
  },
  // The size of the command button and its icon
  size: {
    type: String as PropType<ComponentSize>,
    required: false,
    default: null
  }
})

const { name } = props

const {
  commandHandler,
  size,
  isDisabled,
  isActive
} = toRefs(props)

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const buttonSizeConfig: Partial<Record<ViewportSize, ComponentSize>> = {
  [ViewportSize.XS]: ComponentSize.XS,
  [ViewportSize.SM]: ComponentSize.XS,
  [ViewportSize.XL]: ComponentSize.LG
}

const buttonSizeResponsive: Ref<ComponentSize> = useResponsiveComponentSize(buttonSizeConfig, ComponentSize.SM)
const buttonSize: Ref<ComponentSize> = computed(() => {
  const newButtonSize = size.value ?? buttonSizeResponsive.value
  return newButtonSize
})

const buttonName = computed(() => nameDOMElement(name))

</script>

