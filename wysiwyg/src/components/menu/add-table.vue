<template>
  <v-menu
    :attach="appComponentElementOrNullRef"
    :name="nameDOMElement('table_menu', ElementType.CONTAINER)"
  >
    <template #activator="{ props: menu }">
      <slot
        name="activation-button"
        v-bind="menu"
      />
    </template>
    <slot name="menu-items" />
  </v-menu>
</template>

<script setup lang="ts">
import { injectHostElementRef } from '../../di'
import {
  nameDOMElement, ElementType 
} from '../../utils'

const appComponentElementOrNullRef = injectHostElementRef()

defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    required: true
  }
})
</script>
