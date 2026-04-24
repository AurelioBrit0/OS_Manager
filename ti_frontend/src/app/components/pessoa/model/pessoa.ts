export class Pessoa {
id?: number;
nome!: string;
cpf?: string;
cnpj?: string;
telefone?: string;
endereco?: string;
funcao!: 'ADMIN' | 'TECNICO' | 'FINANCEIRO' | 'CLIENTE_EMPRESA' | 'CLIENTE_PF' | 'FORNECEDOR'; 
}