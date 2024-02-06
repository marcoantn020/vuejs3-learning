import {TipoNotificao} from "@/interfaces/INotificacao";
import {store} from "@/store";
import {NOTIFICAR} from "@/store/tipo-mutacoes";

type UseNotificador = {
    notificar: (tipo: TipoNotificao, titulo: string, texto: string) => void
}

export default (): UseNotificador => {
    const notificar = (tipo: TipoNotificao, titulo: string, texto: string): void => {
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo
        })
    }

    return {
        notificar
    }
}