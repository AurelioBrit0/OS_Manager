export class OS {
  id?: number;
  dataAbertura!: string;
  dataFechamento?: string;
  titulo!: string;
  descricao!: string;
  comentario?: string;
  status!: 'NOVO' | 'EM_ANDAMENTO' | 'FINALIZADO' | 'CANCELADO';
  pessoa?: any;  
  produto!: { id: number };
  valor!: number;
}
