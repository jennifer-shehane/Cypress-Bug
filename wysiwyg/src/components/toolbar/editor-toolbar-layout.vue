<template>
  <v-container
    fluid
    class="ma-0 pa-0 w-100 show-on-hover"
    :style="styleObject"
  >
    <v-row
      align-content="stretch"
      align-items="stretch"
      justify="start"
      justify-content="start"
    >
      <v-col class="v-col-auto pb-0">
        <slot name="left" />
      </v-col>
      <v-col class="v-col-auto pb-0 d-flex flex-1-1">
        <slot name="right" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {
  toRefs, computed, type StyleValue 
} from 'vue'

const props = defineProps({
  isSticky: {
    type: Boolean,
    required: false,
    default: true
  },
  opacity: {
    type: Number,
    required: false,
    default: 1
  }
})

const {
  isSticky, 
  opacity 
} = toRefs(props)

const styleObject = computed((): StyleValue => {
  const stylesSticky: StyleValue = isSticky.value ? {
    position: 'sticky',
    top: '0'
  } : { position: 'relative' } 
  const stylesOpacity: StyleValue = { opacity: String(opacity.value) }

  return {
    ...stylesSticky,
    ...stylesOpacity,
    zIndex: 1000 // TODO: otherwise the toolbar is hidden behind the content in Shadow DOM
  }
})
</script>
