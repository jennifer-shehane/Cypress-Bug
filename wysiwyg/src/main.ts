import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.min.css'

import WebComponentWysiwyg from './WebComponentEntry.vue'

createApp(WebComponentWysiwyg).use(createVuetify({
  components,
  directives
})).mount('#app')
