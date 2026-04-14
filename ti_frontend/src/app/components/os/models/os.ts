export class OS {
  id?: number;
  dataAbertura!: string;
    horaAbertura!: string;
  dataFechamento?: string;
    horaFechamento?: string;
  titulo!: string;
  descricao!: string;
  comentario?: string;
  status!: 'NOVO' | 'EM_ANDAMENTO' | 'FINALIZADO' | 'CANCELADO';
  pessoa?: any;  
  produto!: any;
  valor!: number;
}
