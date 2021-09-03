export class Tarefa {
    constructor(
        public id: number,
        public descricao: string,
        public concluida: boolean,
        public dataCriacao: string,
        public dataConclusao: string
    ){}
}