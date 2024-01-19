<template>
  <div style="display: flex; flex-flow: row nowrap; height: 500px; width: 100%;">
    <wysiwyg-editor style="width: 100%; height: 100%" />
  </div>
</template>

<script>
import { registerWebComponentWYSIWYG } from './index'

void registerWebComponentWYSIWYG('wysiwyg-editor')
</script>
