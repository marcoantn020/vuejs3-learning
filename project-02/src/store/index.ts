import IProjeto from "@/interfaces/IProjeto";
import {createStore, Store, useStore as vuexUseStore} from "vuex";
import {InjectionKey} from "vue";
import {NOTIFICAR} from "@/store/tipo-mutacoes";
import INotificacao from "@/interfaces/INotificacao";
import ITarefas from "@/interfaces/ITarefas";
import {EstadoDoProjeto, projeto} from "@/store/modulos/projetos";
import {EstadoDaTarefa, tarefa} from "@/store/modulos/tarefas";

export interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefas[],
    notificacoes: INotificacao[],
    projeto: EstadoDoProjeto,
    tarefa: EstadoDaTarefa,
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store: Store<Estado> = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: [],
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        },

    },
    mutations: {
        [NOTIFICAR](state, notificacao: INotificacao) {
            notificacao.id = new Date().getTime()
            state.notificacoes.push(notificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes
                    .filter(notificacaoStore => notificacaoStore.id != notificacao.id)
            }, 3000)
        },
    },
    actions: {},
    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
