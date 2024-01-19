<template>
  <v-icon v-bind="props">
    <slot />
  </v-icon>
</template>

<script setup lang="ts">
import { VIcon } from 'vuetify/components/VIcon'
const props = defineProps(VIcon.props)
</script>
