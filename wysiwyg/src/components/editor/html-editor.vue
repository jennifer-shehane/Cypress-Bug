<template>
  <EditorContent
    v-if="isEditorReady"
    :editor="editor"
    class="fill-height editor__content"
    :class="{ 'editor__content--table-editable': optionsTipTapEditorTableResizable }"
    :name="nameDOMElement('editor_content', ElementType.CONTAINER)"
  />
</template>

<script setup lang="ts">
import {
  EditorContent, type Editor
} from '@tiptap/vue-3'
import {
  defineProps, computed, type PropType, toRefs
} from 'vue'
import { optionsTipTapEditorTableResizable } from '../../conf'
import {
  nameDOMElement, ElementType 
} from '../../utils'

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: false,
    default: null
  }
})
const { editor } = toRefs(props)

const isEditorReady = computed(() => Boolean(editor))
</script>

<style scope lang="scss">
    @import './editor.scss';
</style>
