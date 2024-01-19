<template>
  <v-app
    :id="rootElementId"
    ref="appComponentRef"
    v-scroll.self="onScroll"
    :class="className"
    class="overflow-x-hidden overflow-y-auto flex-fill"
    :theme="theme"
    full-height
  >
    <EditorLayout container-class-name="no-padding">
      <template #toolbar_buttons>
        <Toolbar
          v-if="!!editorOrUndefinedRef"
          :editor="editorOrUndefinedRef"
          :size="size"
          :opacity="isScrolled ? .7 : 1"
        />
      </template>
      <template #main_editor>
        <Editor :editor="editorOrUndefinedRef" />
      </template>
    </EditorLayout>
  </v-app>
  <!-- https://github.com/vuejs/core/issues/6142 -->
  <slot
    ref="slotElementWithContentOrNullRef"
    name="content"
  />
</template>
  
<script setup lang="ts">
import {
  useEditor, type EditorOptions 
} from '@tiptap/vue-3'
import {
  type PropType, defineProps, watch, ref, type Ref
} from 'vue'
import {
  EditorLayout, Editor, Toolbar 
} from './components'
import {
  appConfig, breakpointsConfig 
} from './conf'
import { optionsTipTapEditor } from './conf'
import { provideViewportSize } from './di'
import { provideHostElementRef } from './di/host-element-ref/provide'
import { type ComponentSize } from './enums'
import { useSlotAssignedElement } from './hooks'
import type { VueComponentInstanceRef } from './hooks'
import { useComponentElementRef } from './hooks/component-element-ref'
import { useComponentSize } from './hooks/component-size'
import { useRefContent } from './hooks/editor/ref-content'
import { useHostElement } from './hooks/host-element'

const { rootElementId } = appConfig

const props = defineProps({
  /**
   * The content HTML markup string to edit
   */
  content: {
    type: String as PropType<string>,
    required: false,
    default: undefined
  },
  /**
     * The configuration of the TipTap editor
     * https://tiptap.dev/guide/configuration
     */
  editorConfiguration: {
    type: Object as PropType<EditorOptions>,
    required: false,
    default: () => ({})
  },
  /**
     * The Vuetify3 theme name to use.
     * https://vuetifyjs.com/en/features/theme/#changing-theme
     */
  theme: {
    type: String as PropType<string>,
    required: false,
    default: 'light'
  },
  /**
     * The CSS class name to apply to the root element.
     */
  className: {
    type: String as PropType<string>,
    required: false,
    default: ''
  },
  /**
     * The size of the UI elements - buttons, icons, etc.
     * e.g. https://vuetifyjs.com/en/components/buttons/#size - button size
     * https://vuetifyjs.com/en/components/icons/#usage - icon size
     */
  size: {
    type: String as PropType<ComponentSize>,
    required: false,
    default: null
  }
})

const appComponentRef = ref<VueComponentInstanceRef | undefined>(undefined)
const appComponentElementOrNullRef: Ref<HTMLElement | undefined> = useComponentElementRef(appComponentRef)
provideHostElementRef(appComponentElementOrNullRef)

const { width } = useComponentSize(appComponentRef)

const breakpointsConfigRef = ref(breakpointsConfig)
provideViewportSize(width, breakpointsConfigRef)

const slotElementWithContentOrNullRef = ref<HTMLSlotElement | null>(null)
const {
  editorConfiguration, 
  content 
} = props
const editorOptions = {
  ...optionsTipTapEditor,
  ...editorConfiguration,
  editorProps: {
    ...editorConfiguration?.editorProps,
    attributes: {
      ...optionsTipTapEditor?.editorProps?.attributes,
      ...editorConfiguration?.editorProps?.attributes
    }
  },
  extensions: [
    ...optionsTipTapEditor.extensions ?? [],
    ...editorConfiguration?.extensions ?? []
  ],
  content
}
// an instance of the TipTap editor
// https://tiptap.dev/introduction
const editorOrUndefinedRef = useEditor(editorOptions)

// The "getHTML" API method is exposed to the external app.
const getHTML = (): string => editorOrUndefinedRef.value?.getHTML() ?? ''

// TODO: https://github.com/vuejs/core/issues/5540#issuecomment-1541473789 - methods declared via "defineExpose" aren't available on the WebComponent
// A list of API methods to expose to the external app.
defineExpose({ getHTML })

// The "host" element is the root element of the WC.
// https://developer.mozilla.org/en-US/docs/Web/CSS/:host_function
// https://developer.mozilla.org/en-US/docs/Web/API/Web_components#shadow_dom
const host = useHostElement()

// https://github.com/vuejs/core/issues/5540#issuecomment-1129912330 - a solution to expose methods to the external app
// set the "getHTML" function as a method of the  WC "host" element.
// The external app should call it to get the HTML of the editor.
watch(host, (h: any) => {
  if (!(Boolean(h))) return
  (h )._getHTML = getHTML
})

// the content that will be rendered in the editor
const editorContentRef = ref(content)
useRefContent(editorOrUndefinedRef, editorContentRef)

// A WC "slot" that is used to pass down complex HTML markup as the content of the editor.
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
// E.g. <wysiwyg-editor name="long_description_wysiwyg">
//     <div slot="content">
//      "<p>....</p>"
//     </div>
// </wysiwyg-editor>
const slotAssignedElementRef: Ref<HTMLElement | undefined> = useSlotAssignedElement(
  slotElementWithContentOrNullRef
)
  
// Watches the slot assigned element and updates the editor content accordingly.
watch(slotAssignedElementRef, (element: HTMLElement | undefined): void => {
  if ((element?.style) == null) return

  // hide the slot assigned element, otherwise it'll be displayed below
  // the editor component on the screen.
  (element ).style.display = 'none'
  editorContentRef.value = element.textContent ?? ''
})

const isScrolled = ref(false)
function onScroll (e: WheelEvent): void {
  const targetElementOrNull = e.target as HTMLDivElement | null
  isScrolled.value = (targetElementOrNull?.scrollTop ?? 0) > 0
}
</script>

<style lang="scss">
  // These styles are global to the Shadow DOM components and applied not only to this Vue component.
  // Therefore they shouldn't be "scoped".
  // TODO: we may need to move them to the "global.css" file.

  // https://github.com/vuetifyjs/vuetify/issues/11452
  // https://stackoverflow.com/questions/76162592/how-to-embed-vuetify-app-in-page-with-height-fitting-the-content-and-not-affecte
  .v-application {
    position: relative;

    .v-application__wrap {
      // this is a hack making the Toolbar be sticky to the top of the host element (.v-application) in the shadow DOM.
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      min-height: 100%;
    }
  }

  // TODO: "v-hover" (https://vuetifyjs.com/en/components/hover/#hover-list) doesn't switch "isHovering" prop to "true" when the mouse is over the "v-btn" element.
  // this is a workaround to fix it. 
  .show-on-hover:hover {
    opacity: 1 !important;
    transition: opacity 0.2s ease-in-out;
  }

  .no-padding {
    padding-left: 0;
    padding-right: 0;
  }
</style>
