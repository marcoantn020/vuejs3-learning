<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: 'CronomentoComponent',
  props: {
    tempoEmSegundos: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    tempoDecorrido(): string {
      return new Date(this.tempoEmSegundos * 1000)
          .toISOString()
          .substr(11,8)
    }
  }
})
</script>

<template>
  <section>
    <strong>
      <i class="fa-solid fa-clock"></i>
      {{ tempoDecorrido }}
    </strong>
  </section>
</template>

<style>
</style>