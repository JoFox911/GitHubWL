<template>
<div>
  <img class="egg" :src="colorUrl"  :class="{'winner': isWinner}"/>
</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EggLabel',
  props: {
    colorUrl: {
      type: String,
      required: true
    },
    isWinner: {
      type: Boolean
    }
  }
})
</script>
