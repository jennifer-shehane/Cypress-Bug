<template>
  <!-- 
        The overlay container (a component with the css class "v-overlay-container")
        is rendered outside of the shadow dom. This causes the toolbar to be rendered
        outside of the shadow dom as well. This is a problem because the toolbar is
        positioned absolutely and therefore not visible inside the shadow dom.
        https://github.com/angular/components/issues/13436
        https://github.com/vuetifyjs/vuetify/issues/9056
    -->
  <slot name="toolbar_buttons" />
  <v-progress-linear
    v-if="!$slots.toolbar_buttons"
    indeterminate
  />
  <v-main
    app
    class="d-flex flex-fill align-stretch justify-start"
    :name="nameDOMElement('container_main', ElementType.CONTAINER)"
  >
    <v-container
      fluid
      :name="nameDOMElement('container_inner', ElementType.CONTAINER)"
      :class="containerClassName"
    >
      <slot name="main_editor" />
      <v-progress-linear
        v-if="!$slots.main_editor"
        indeterminate
      />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import {
  nameDOMElement, ElementType 
} from '../../utils'
defineProps({
  containerClassName: {
    type: String,
    required: false,
    default: ''
  }
})
</script>