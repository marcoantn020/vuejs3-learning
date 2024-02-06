<script lang="ts">

import {computed, defineComponent} from "vue";
import {useStore} from "@/store";
import {TipoNotificao} from "@/interfaces/INotificacao";

export default defineComponent({
  name: 'NotoficacoesMensagens',
  data() {
    return {
      contexto: {
        [TipoNotificao.SUCESSO]: 'is-success',
        [TipoNotificao.ATENCAO]: 'is-warning',
        [TipoNotificao.FALHA]: 'is-danger',
      }
    }
  },
  setup() {
    const store = useStore()
    return {
      notificacoes: computed(() => store.state.notificacoes)
    }
  }
})
</script>

<template>
  <div class="notificacoes">
    <article class="message"
             :class="contexto[notificacao.tipo]"
             v-for="notificacao in notificacoes"
             :key="notificacao.id">

      <div class="message-header">
        <p>{{ notificacao.titulo }}</p>
      </div>

      <div class="message-body">
        {{ notificacao.texto }}
      </div>

    </article>
  </div>
</template>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 2;
}
</style>