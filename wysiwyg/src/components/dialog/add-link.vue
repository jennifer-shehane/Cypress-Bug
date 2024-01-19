<template>
  <!-- 
    TODO: "persistent" prop prevents the dialog from being closed by clicking outside of its window
    this is a workaround for the issue that Vue or Vuetify detects any click as an external in relation
    to the dialog, when the dialog is wrapped into a WebComponent. 
  -->
  <v-dialog
    v-model="isDialogOpened"
    :name="nameDOMElement('url_popup', ElementType.DIALOG_CONTAINER)"
    persistent
    :attach="appComponentElementOrNullRef"
    origin="center center"
    :class="dialogClassWidth"
    :fullscreen="dialogIsFullscreen"
  >
    <template #activator="{ props: activatorProps }">
      <slot v-bind="activatorProps" />
    </template>
    <v-card :name="nameDOMElement('url_container', ElementType.CONTAINER)">
      <v-card-title>
        <span class="text-h5">Add a new link:</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            v-model="isValid"
            validate-on="submit lazy"
            @submit.prevent="onSave"
          >
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="urlObj.url"
                  :name="nameDOMElement('url_input', ElementType.INPUT_ELEMENT)"
                  label="Url*"
                  required
                  validate-on="blur"
                  :rules="urlRules"
                  hint="The url to link to"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                lg="5"
                xl="4"
              >
                <h6 class="text-h6">
                  Link target:
                </h6>  
                <v-btn-toggle v-model="urlObj.target">
                  <v-btn
                    v-for="item in targetsSelectValues"
                    :key="item.value"
                    variant="outlined"
                    :name="nameDOMElement(item.value)"
                  >
                    {{ item.title }}
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-divider />
                <v-btn
                  type="submit"
                  color="blue-darken-1"
                  variant="text"
                  :name="nameDOMElement('url_save')"
                >
                  Save
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  size="large"
                  :name="nameDOMElement('url_close')"
                  @click="handleCloseDialog"
                >
                  Close
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  ref, reactive, toRefs, watch, computed
} from 'vue'
import {
  injectHostElementRef, injectViewportSize 
} from '../../di'
import {
  nameDOMElement, ElementType 
} from '../../utils'
import {
  type ChangeUrlPayload, type Target 
} from './types'
import {
  validateFullUrl, validateRelativeUrl 
} from './validate-url'

const appComponentElementOrNullRef = injectHostElementRef()

// The target attribute specifies where to open the linked document.
const targets = {
  'New tab': '_blank', // Opens the linked document in a new window or tab
  'Same tab': '_self' // Opens the linked document in the same frame as it was clicked (this is default)
} as const
const targetsSelectValues = Object.keys(targets).map((key) => ({
  title: key,
  value: targets[key as keyof typeof targets]
}))

function getTargetIdx (target: string): number {
  return target.trim().length > 0 ? targetsSelectValues.findIndex(({ value }) => value === target) : 0
}

const props = defineProps({
  // The url of the link
  url: {
    type: String,
    default: ''
  },
  // The target attribute specifies where to open the linked document.
  target: {
    type: String,
    default: '_blank'
  }
})
  
const {
  url, 
  target 
} = toRefs(props)

const emit = defineEmits({
  // The event that will be emitted when the url and target are saved
  change (payload: ChangeUrlPayload): boolean {
    return typeof payload === 'object'
  }
})

// a flag indicating whether the dialog is opened
const isDialogOpened = ref(false)
const urlObj = reactive({
  url: url.value,
  target: getTargetIdx(target.value)
})
const urlTarget = computed((): Target => targetsSelectValues[urlObj.target].value)

// if the property reference is changed from the outside, update the "urlObj.target" accordingly
watch(url, (value: string) => {
  urlObj.url = value
})
watch(target, (value: string) => {
  urlObj.target = getTargetIdx(value)
})


const viewportSizeRef = injectViewportSize()

const dialogIsFullscreen = computed(() => {
  return Boolean(viewportSizeRef.value.xs)
})
const dialogClassWidth = computed(() => {
  const viewportSize = viewportSizeRef.value
  if (viewportSize.xl) {
    return 'w-25'
  }
  if (viewportSize.xs || viewportSize.sm) {
    return null
  }
  return 'w-50'
})

// a flag indicating whether the url is valid
const isValid = ref(false)
// validation rules for the url
const urlRules = [
  (v: string): string | boolean => Boolean(v) || 'Url is required',
  (v: string): string | boolean => {
    // if the target is "_self" and the url starts with "/" then it's a relative url
    if (urlTarget.value === '_self' || v.startsWith('/')) {
      return validateRelativeUrl(v) || 'Must be a valid relative url (e.g. /about-us)'
    }
    return validateFullUrl(v) || 'Must be a valid url'
  }
]

const handleCloseDialog = (): void => {
  isDialogOpened.value = false
}

// Saves the url and target and closes the dialog.
// The editor selected text is transformed into a link with the specified url and target.
const onSave = async (): Promise<void> => {
  await new Promise(res => setTimeout(res)) // TODO: a hack that allows the validation to finish correctly before the dialog is closed
  if (!isValid.value) return
  const payload: ChangeUrlPayload = {
    ...urlObj,
    target: urlTarget.value
  }
  emit('change', payload)
  handleCloseDialog()
}
</script>
