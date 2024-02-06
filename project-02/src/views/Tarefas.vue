<script lang="ts">

import {computed, defineComponent, ref, watchEffect} from "vue";
import TarefaComponente from "@/components/Tarefa.vue";
import BoxComponent from "@/components/Box.vue";
import Formulario from "@/components/Formulario.vue";
import ITarefas from "@/interfaces/ITarefas";
import {useStore} from "@/store";
import {ALTERAR_TAREFAS, CADASTRAR_TAREFAS, OBTER_PROJETOS, OBTER_TAREFAS} from "@/store/tipo-acoes";
import ModalComponente from "@/components/Modal.vue";

export default defineComponent({
  name: 'TarefasComponente',
  components: {ModalComponente, Formulario, BoxComponent, TarefaComponente},
  data() {
    return {
      tarefaSelecionada: null as ITarefas | null
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    const filtro = ref("")
    const tarefas = computed(() => store.state.tarefa.tarefas)

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    return {
      filtro,
      store,
      tarefas
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas?.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefas) {
      this.store.dispatch(CADASTRAR_TAREFAS, tarefa)
    },
    selecionarTarefa(tarefa: ITarefas) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFAS, this.tarefaSelecionada)
          .then(() => this.fecharModal())
    }
  },
})
</script>

<template>
  <Formulario @ao-salvar-tarefa="salvarTarefa"/>
  <div class="lista">
    <BoxComponent v-if="listaEstaVazia">
      Voce nao executou nenhuma atividade hoje
    </BoxComponent>

    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input v-model="filtro" class="input" type="text" placeholder="Busque aqui">
        <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>

    <TarefaComponente
        v-for="(tarefa, index) in tarefas"
        :key="index"
        :tarefa="tarefa"
        @ao-tarefa-clicada="selecionarTarefa"
    />


    <ModalComponente :mostrar="tarefaSelecionada != null">
      <template v-slot:header>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:body>
        <div class="field">
          <label for="nomeDaTarefa" class="label">Descricao tarefa</label>
          <input
              type="text"
              v-model="tarefaSelecionada.descricao"
              class="input">
        </div>
      </template>
      <template v-slot:footer>
        <button @click="alterarTarefa" class="button is-success">Salvar</button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </ModalComponente>

  </div>
</template>

<style>
.lista {
  padding: 1.25rem;
}

</style>