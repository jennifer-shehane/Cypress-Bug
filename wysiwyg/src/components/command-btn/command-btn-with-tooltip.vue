<template>
  <TooltipAttachedToHost
    :tooltip="tooltip"
    :name="name"
  >
    <template #activator="{ props: tooltipProps }">
      <CommandBtn
        v-bind="mergeProps($props, tooltipProps)"
      >
        <slot />
      </CommandBtn>
    </template>
  </TooltipAttachedToHost>
  <CommandBtn
    v-if="!Boolean(tooltip)"
    v-bind="$props"
  >
    <slot />
  </CommandBtn>
</template>

<script setup lang="ts">
import { 
  toRefs,
  mergeProps,
  type PropType
} from 'vue'
import { TooltipAttachedToHost } from '../tooltip'

import CommandBtn from './command-btn.vue'

const props = defineProps({
  ...CommandBtn.props,
  // The tooltip to display when the user hovers over the command button
  tooltip: {
    type: String as PropType<string>,
    required: false,
    default: null
  }
})

const { tooltip } = toRefs(props)

</script>

