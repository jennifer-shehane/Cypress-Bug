import type { Ref } from 'vue'

export type VueComponentInstanceRef = Ref<{ $el?: HTMLElement | null } | undefined>
