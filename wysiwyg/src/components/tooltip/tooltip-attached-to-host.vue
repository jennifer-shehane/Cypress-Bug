<template>
  <v-tooltip
    v-if="Boolean(tooltip)"
    v-bind="$props"
    :text="tooltip"
    :name="nameDOMElement(name, ElementType.TOOLTIP_CONTAINER)"
    :attach="appComponentElementOrNullRef"
    location="bottom"
  >
    <template #activator="{ props: tooltipProps }">
      <slot
        name="activator"
        :props="tooltipProps"
      />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import {
  defineProps, type PropType 
} from 'vue'
import { VTooltip } from 'vuetify/components/VTooltip'
import { injectHostElementRef } from '../../di'
import {
  nameDOMElement, ElementType 
} from '../../utils'
    
const appComponentElementOrNullRef = injectHostElementRef()

defineProps({
  ...VTooltip.props,
  tooltip: {
    type: String as PropType<string>,
    required: false,
    default: null
  },
  name: {
    type: String as PropType<string>,
    required: false,
    default: ''
  }
})
</script>
