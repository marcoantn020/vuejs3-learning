import {Module} from "vuex";
import {Estado} from "@/store";
import {ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS} from "@/store/tipo-mutacoes";
import ITarefas from "@/interfaces/ITarefas";
import {ALTERAR_TAREFAS, CADASTRAR_TAREFAS, OBTER_TAREFAS} from "@/store/tipo-acoes";
import clientHttp from "@/http";

export interface EstadoDaTarefa {
    tarefas: ITarefas[]
}

export const tarefa: Module<EstadoDaTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefas[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefas) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefas) {
            const index = state.tarefas.findIndex(tarefaStore => tarefaStore.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
    },
    actions: {
        [OBTER_TAREFAS]({commit}, filtro: string) {
            let url = 'tarefas'
            if (filtro) {
                url += `?descricao=${filtro}`
            }
            clientHttp.get(url)
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
                .catch(err => console.log(err))
        },
        [CADASTRAR_TAREFAS]({ commit }, tarefa: ITarefas) {
            clientHttp.post("tarefas", tarefa)
                .then((resposta) => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFAS]({commit}, tarefa: ITarefas) {
            clientHttp.put(`tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        }
    }
}