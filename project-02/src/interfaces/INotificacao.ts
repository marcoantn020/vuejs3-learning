export enum TipoNotificao {
    SUCESSO,
    FALHA,
    ATENCAO
}

export default interface INotificacao {
    id: number
    titulo: string
    texto: string
    tipo: TipoNotificao
}