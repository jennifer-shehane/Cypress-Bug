<template>
  <ToolbarLayout>
    <template #left>
      <ButtonsUndoRedo
        :size="size"
        :editor="editor"
      />
      <ButtonsFormatting
        :size="size"
        :editor="editor"
      />
      <ButtonsAlignment
        :size="size"
        :editor="editor"
      />
      <ButtonLinkInsertion
        :size="size"
        :editor="editor"
      />
      <ButtonTableInsertion
        :editor="editor"
        :size="size"
      />
    </template>
    <template #right>
      <v-row>
        <v-col
          cols="6"
          xxl="1"
          xl="2"
          lg="3"
          md="4"
        >
          <SelectFontSize
            :size="size"
            :editor="editor"
          />
        </v-col>
        <v-col
          cols="6"
          xxl="1"
          xl="2"
          lg="3"
          md="4"
        >
          <SelectHeading
            :size="size"
            :editor="editor"
          />
        </v-col>
      </v-row>
    </template>
  </ToolbarLayout>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import {
  defineProps, type PropType 
} from 'vue'
    

import { type ComponentSize } from '../../enums'
import { 
  ButtonLinkInsertion,
  ButtonTableInsertion,
  ButtonsFormatting,
  ButtonsAlignment,
  ButtonsUndoRedo
} from '../buttons'
import {
  SelectFontSize, 
  SelectHeading 
} from '../select'
import ToolbarLayout from './editor-toolbar-layout.vue'

defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true
  },
  size: {
    type: String as PropType<ComponentSize>,
    required: true
  }
})
</script>
