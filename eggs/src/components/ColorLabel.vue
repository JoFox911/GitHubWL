<template>
  <img
    class="circle"
    :src="colorUrl" 
    @click="clickOnLabel"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ColorLabel',
  props: {
    colorUrl: {
      type: String,
      required: true
    }
  },
  emits: ['onClick'],
  methods: {
    clickOnLabel() {
      this.$emit('onClick')
    }
  }
})
</script>
