// Importing VuetifyOptions type from 'vuetify'
import { type VuetifyOptions } from 'vuetify'

// This function loads the CSS of the Editor for the editor and returns it as a string.
// This is necessary because a CSS of underlying components is not loaded by the 
// Vue web component itself.
async function loadEditorCSSBundleStringified (): Promise<string> {
  const { default: styles } = await import('./components/editor/editor.scss?inline')
  return styles ?? ''
}

// TODO: the ProseMirror styles make tables look different in the editor and in the preview.
// Therefore they are disabled for now.
const enableLoadProseMirrorCSS: boolean = false

// This function loads the CSS of the ProseMirror/TipTap for the editor and returns it as a string.
// It includes styles for the tables.
async function loadProseMirrorCSSBundleStringified (): Promise<string> {
  if (!enableLoadProseMirrorCSS) {
    return ''
  }
  const { default: styles } = await import('prosemirror-tables/style/tables.css?inline')
  return styles ?? ''
}

// This function registers the WYSIWYG web component
async function registerWebComponentWYSIWYG (
  tag: string, // The tag name for the web component
  vuetifyOptions?: VuetifyOptions, // Optional Vuetify options
  injectStyles?: string[] // Optional array of styles to inject
): Promise<void> {
  // Use Promise.all to concurrently load the necessary modules and data
  const [
    { registerAsWebComponentWithVuetify },
    TipTapEditor,
    editorCSSStyle,
    proseMirrorCSSStyle
  ] = await Promise.all([
    (await import('./utils/register-web-component')),
    // Dynamically import the TipTap.ce.vue component
    (await import('./TipTap.ce.vue')).default,
    // Load the editor CSS
    await loadEditorCSSBundleStringified(),
    await loadProseMirrorCSSBundleStringified()
  ])
  // Insert a Vuetify Theme CSS variable
  // as a rule into the ShadowDOM stylesheet
  const vuetifyThemeFix = ':root, body, div { --v-theme-overlay-multiplier: 2 }'

  // Register the web component using the loaded modules and data
  await registerAsWebComponentWithVuetify(vuetifyOptions)({
    tag,
    Component: TipTapEditor,
    stylesStringified: [
      ...injectStyles ?? [],
      editorCSSStyle,
      proseMirrorCSSStyle,
      vuetifyThemeFix
    ]
  
  })
}

export { registerWebComponentWYSIWYG }