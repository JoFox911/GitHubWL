<template>
    <div class="game-side-bar">
        <div class="colors-container-inner items-center">
            <color-label
                v-for="(colorData, index) in colorsData"
                :key="colorData.key"
                :colorUrl="colorData.color"
                @onClick="clickOnLabel(index)"
            />
        </div>
        
    </div>
</template>

<script>
import { defineComponent } from 'vue'

import ColorLabel from '@components/ColorLabel.vue'

export default defineComponent({
  name: 'ColorList',
  components: {
    ColorLabel
  },
  props: {
    colorsData: {
      type: Array,
      required: true
    }
  },
  emits: ['onClick'],
  methods: {
    clickOnLabel(index) {
      this.$emit('onClick', index)
    }
  }
})
</script>
