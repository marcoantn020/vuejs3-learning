<script lang="ts">

import {defineComponent, ref} from "vue";
import {useStore} from "@/store";
import {TipoNotificao} from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/useNotificador";
import {ALTERAR_PROJETOS, CADASTRAR_PROJETOS} from "@/store/tipo-acoes";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'ProjetosComponent',
  props: {
    id: {type: String, required: true}
  },
  setup(props) {
    const store = useStore()
    const {notificar} = useNotificador()
    const router = useRouter()
    const nomeDoProjeto = ref("")

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(projeto => projeto.id == props.id)
      nomeDoProjeto.value = projeto?.nome || ''
    }

    const salvar = () => {
      if (nomeDoProjeto.value == '') {
        notificar(
            TipoNotificao.FALHA,
            'Falha',
            'Informe o nome do projeto'
        )
        return
      }
      if (props?.id) {
        store.dispatch(ALTERAR_PROJETOS, {
          id: props.id,
          nome: nomeDoProjeto.value
        })
            .then(() => sucesso())
      } else {
        store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
            .then(() => sucesso())
      }
    }
    const sucesso = () => {
      notificar(TipoNotificao.SUCESSO, 'Sucesso', 'Novo projeto adicionado com sucesso! ;)')
      nomeDoProjeto.value = ''
      router.push('/projetos')
    }

    return {
      nomeDoProjeto,
      salvar
    }
  }
})
</script>

<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
            type="text"
            id="nomeDoProjeto"
            v-model="nomeDoProjeto"
            class="input">
      </div>

      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>

    </form>
  </section>
</template>
