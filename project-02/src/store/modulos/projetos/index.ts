import IProjeto from "@/interfaces/IProjeto";
import {Module} from "vuex";
import {Estado} from "@/store";
import {ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO} from "@/store/tipo-mutacoes";
import {ALTERAR_PROJETOS, CADASTRAR_PROJETOS, OBTER_PROJETOS, REMOVER_PROJETOS} from "@/store/tipo-acoes";
import clientHttp from "@/http";

export interface EstadoDoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoDoProjeto, Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(projetoSate => projetoSate.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(projeto => projeto.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
    },
    actions: {
        [OBTER_PROJETOS]({commit}) {
            clientHttp.get("projetos")
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
                .catch(err => console.log(err))
        },
        [CADASTRAR_PROJETOS](contexto, nomeProjeto: string) {
            return clientHttp.post("projetos", {
                nome: nomeProjeto
            })
        },
        [ALTERAR_PROJETOS](contexto, projeto: IProjeto) {
            return clientHttp.put(`projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETOS]({commit}, id) {
            clientHttp.delete(`projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
    }
}