<script setup lang="ts">
import {ref} from 'vue';
import SuaLista from "@/components/SuaLista.vue";
import SelecionarIngredientes from "@/components/SelecionarIngredientes.vue";
import MostrarReceitas from "@/components/MostrarReceitas.vue";


const ingredientes = ref<string[]>([]);
type Pagina = 'SelecionarIngredientes' | 'MostrarReceitas'
const conteudo = ref<Pagina>('SelecionarIngredientes')

function adicionarIngrediente(ingrediente: string) {
  ingredientes.value.push(ingrediente)
}

function removerIngrediente(ingrediente: string) {
  ingredientes.value = ingredientes.value.filter(iLista => ingrediente !== iLista);
}

function navegar(pagina: Pagina) {
  conteudo.value = pagina
}

</script>


<template>
  <main class="conteudo-principal">

    <SuaLista :ingredientes="ingredientes"/>

    <KeepAlive include="SelecionarIngredientes">
      <SelecionarIngredientes v-if="conteudo === 'SelecionarIngredientes'"
                              @adicionar-ingrediente="adicionarIngrediente"
                              @remover-ingrediente="removerIngrediente"
                              @buscar-receitas="navegar('MostrarReceitas')"
      />

      <MostrarReceitas
          :ingredientes="ingredientes"
          v-else-if="conteudo === 'MostrarReceitas'"
          @editar-receitas="navegar('SelecionarIngredientes')"
      />
    </KeepAlive>


  </main>
</template>

<style scoped>
.conteudo-principal {
  padding: 6.5rem 7.5rem;
  border-radius: 3.75rem 3.75rem 0rem 0rem;
  background: var(--creme, #FFFAF3);
  color: var(--cinza, #444);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
}

@media only screen and (max-width: 1300px) {
  .conteudo-principal {
    padding: 5rem 3.75rem;
    gap: 3.5rem;
  }
}

@media only screen and (max-width: 767px) {
  .conteudo-principal {
    padding: 4rem 1.5rem;
    gap: 4rem;
  }
}

</style>