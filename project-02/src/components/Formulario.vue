<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import TemporizadorComponent from "@/components/Temporizador.vue";
import {useStore} from "vuex";
import {key} from "@/store";

export default defineComponent({
  name: 'FormularioCadastro',
  emits: ['aoSalvarTarefa'],
  components: {TemporizadorComponent},
  setup(props, { emit }) {
    const store = useStore(key)
    const projetos = computed(() => store.state.projeto.projetos)
    const descricao = ref('')
    const idProjeto = ref('')

    const finalizarTarefa = (tempoDecorrido: number) => {
      emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find(projeto => projeto.id = idProjeto.value)
      })
      descricao.value = ''
    }

    return {
      projetos,
      descricao,
      idProjeto,
      finalizarTarefa
    }
  }
})
</script>

<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulario para criacao de uma nova tarefa">
        <input
            v-model="descricao"
            name="descricao"
            type="text"
            class="input"
            required
            placeholder="Qual tarefa voce deseja iniciar">
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
                :value="projeto.id"
                v-for="projeto in projetos"
                :key="projeto.id"
              >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <TemporizadorComponent @ao-temporizador-finalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.formulario {
  background: var(--bg-primario);
  color: var(--texto-primario);
}
</style>