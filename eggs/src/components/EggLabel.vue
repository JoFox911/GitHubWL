<template>
  <div class="egg-inner" :class="{'loser-animation': isLoser}">
    <img class="egg" :src="colorUrl"  :class="{'winner-animation': isWinner}"/>
    <img v-if="isLoser" class="cross-image" :src="crossUrl"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EggLabel',
  data: function() {
    return {
      crossUrl: 'images/cross.png'
    }
  },
  props: {
    colorUrl: {
      type: String,
      required: true
    },
    isWinner: {
      type: Boolean
    },
    isLoser: {
      type: Boolean
    }
  }
})
</script>
