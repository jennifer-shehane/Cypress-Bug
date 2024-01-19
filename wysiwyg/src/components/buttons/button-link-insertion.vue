<template>
  <DialogLink
    :url="activeLinkValues.url"
    :target="activeLinkValues.target" 
    @change="onLinkChange" 
  >
    <template #default="slotProps">
      <CommandBtnListTrackedVue
        :button-list="linkButton"
        :editor="editor"
        :size="size"
        :on-click="slotProps?.onClick"
        use-btn-active-strategy
      />
    </template>
  </DialogLink>
</template>

<script setup lang="ts">
import { type Editor } from '@tiptap/vue-3'
import {
  ref, toRefs, type PropType 
} from 'vue'
import { type ComponentSize } from '../../enums'
import type { WithCheckIfActive } from '../../types'
import { runEditorFocusChain } from '../../utils'
import type { CommandBtnProps } from '../command-btn'
import { CommandBtnListTrackedVue } from '../command-btn'
import {
  DialogLink, type ChangeUrlPayload 
} from '../dialog'

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true
  },
  size: {
    type: String as PropType<ComponentSize>,
    required: true
  }
})
const { editor } = toRefs(props)

const activeLinkValues = ref({
  url: '',
  target: '' 
})

const changeActiveLinkProps = (
  editor: Editor,
  isLinkActive: boolean
): void => {
  if (isLinkActive) {
    const linkAttrs = editor.getAttributes('link')
    const linkValues = {
      url: linkAttrs.href,
      target: linkAttrs.target
    }
    activeLinkValues.value = linkValues
  } else {
    activeLinkValues.value = {
      url: '',
      target: ''
    }
  }
}

const linkButton: Array<WithCheckIfActive<CommandBtnProps>> = [
  {
    name: 'link',
    tooltip: 'Insert/edit link',
    commandHandler: (): void => undefined,
    icon: 'fa fa-link',
    isActive: false,
    checkIfActive: (editor: Editor): boolean => {
      const isActive: boolean = editor.isActive('link')
      changeActiveLinkProps(editor, isActive)
      return isActive
    }
  }
]
const onLinkChange = (url: ChangeUrlPayload): void => {
  runEditorFocusChain(editor).extendMarkRange('link').setLink({
    href: url.url, 
    target: url.target
  }).run()
}
</script>
