<script lang="ts">
import {defineComponent, PropType} from "vue";
import CronomentoComponent from "@/components/Cronomento.vue";
import ITarefas from "@/interfaces/ITarefas";
import BoxComponent from "@/components/Box.vue";

export default defineComponent({
  name: 'TarefaComponente',
  components: {BoxComponent, CronomentoComponent},
  emits: ['aoTarefaClicada'],
  props: {
    tarefa: { required: true, type: Object as PropType<ITarefas> },
  },
  methods: {
    tarefaClicada() {
      this.$emit('aoTarefaClicada', this.tarefa)
    }
  }
})
</script>

<template>
<BoxComponent>
  <div class="columns">
    <div class="column is-4">
      <span class="cursor" @click="tarefaClicada"> {{ tarefa.descricao || 'Tarefa sem descricao'}} </span>
    </div>

    <div class="column is-3">
      {{ tarefa.projeto?.nome || 'Tarefa sem projeto'}}
    </div>

    <div class="column">
      <CronomentoComponent :tempo-em-segundos="tarefa.duracaoEmSegundos" />
    </div>
  </div>
</BoxComponent>
</template>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>