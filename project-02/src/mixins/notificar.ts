import {TipoNotificao} from "@/interfaces/INotificacao";
import {NOTIFICAR} from "@/store/tipo-mutacoes";
import {store} from "@/store";

export const notificaoMixin = {
    methods: {
        notificar(tipo: TipoNotificao, titulo: string, texto: string): void {
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo
            })
        }
    }
}