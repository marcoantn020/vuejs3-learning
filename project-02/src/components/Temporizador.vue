<script lang="ts">

import {defineComponent} from "vue";
import CronomentoComponent from "@/components/Cronomento.vue";
import BotaoComponent from "@/components/Botao.vue";

export default defineComponent({
  name: 'TemporizadorComponent',
  emits: ['aoTemporizadorFinalizado'],
  components: {BotaoComponent, CronomentoComponent},
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false
    }
  },
  methods: {
    iniciar() {
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1
      },1000)
      this.cronometroRodando = true
    },
    finalizar() {
      clearInterval(this.cronometro)
      this.cronometroRodando = false
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
      this.tempoEmSegundos = 0
    },
  },

})
</script>

<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CronomentoComponent :tempo-em-segundos="tempoEmSegundos"/>
    <BotaoComponent @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="cronometroRodando" />
    <BotaoComponent @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!cronometroRodando" />
  </div>
</template>

<style scoped>

</style>