// Function to load the entire Vuetify CSS bundle as a string
async function loadVuetifyCSSBundleStringified (): Promise<string> {
  const { default: stylesStringified } = await import('vuetify/dist/vuetify-labs.min.css')
  return stylesStringified
}
  
// Function to load the entire FontAwesome CSS as a string
async function loadFontAwesomeCSSBundleStringified (): Promise<string> {
  const { default: stylesStringified } = await import('@fortawesome/fontawesome-free/css/fontawesome.min.css')
  return stylesStringified
}

export async function loadVuetifyCSSBundlesAsStrings (): Promise<string[]> {
  const vuetifyCss = await loadVuetifyCSSBundleStringified()
  const fontAwesomeCss = await loadFontAwesomeCSSBundleStringified()
  return [
    vuetifyCss,
    fontAwesomeCss
  ]
}
