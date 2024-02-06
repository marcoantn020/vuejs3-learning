<script lang="ts">

import Tag from "@/components/Tag.vue";
import type {PropType} from "vue";

export default {
  components: {Tag},
  props: {
    ingredientes: {type: Object as PropType<string[]>, required: true}
  }
}
</script>

<template>
  <section>
      <span class="subtitulo-lg sua-lista-texto">
        Sua lista:
      </span>

    <ul v-if="ingredientes.length" class="ingredientes-sua-lista">
      <li v-for="ingrediente in ingredientes" :key="ingrediente">
        <Tag :texto="ingrediente" ativa/>
      </li>
    </ul>

    <p v-else class="paragrafo lista-vazia">
      <img src="../assets/images/icones/lista-vazia.svg"
           alt="Sua lista está vazia, selecione ingredientes para iniciar.">
      Sua lista está vazia, selecione ingredientes para iniciar.
    </p>
  </section>
</template>

<style scoped>

.ingredientes-sua-lista {
  display: flex;
  justify-content: center;
  gap: 1rem 1.5rem;
  flex-wrap: wrap;
}

.sua-lista-texto {
  color: var(--coral, #F0633C);
  display: block;
  text-align: center;
  margin-bottom: 1.5rem;
}

.lista-vazia {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;

  color: var(--coral, #F0633C);
  text-align: center;
}
</style>