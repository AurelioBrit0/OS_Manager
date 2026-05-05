import { Component, Input, Output, EventEmitter, inject, SimpleChanges } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { PessoaService } from '../pessoa-services';
import { InputMaskModule } from 'primeng/inputmask';


@Component({
  selector: 'app-pessoa-cadastro',
  imports: [CommonModule,
    ButtonModule, 
    InputTextModule, 
    KeyFilterModule, 
    RippleModule, 
    ReactiveFormsModule,
    FormsModule,
  InputMaskModule],
  templateUrl: './pessoa-cadastro.html',
  styleUrl: './pessoa-cadastro.css',
})
export class PessoaCadastro {

 visible: boolean = false;

  /**
   * Abre um dialog (não está sendo usado no modal atual)
   */
  showDialog() {
    this.visible = true;
  }

  /** Marca passada de fora para edição (Input) */
   @Input() pessoaEdicao: Pessoa | null = null;
  @Output() fecharModal = new EventEmitter<void>();
  

  // Injeção de dependências
  private fb = inject(FormBuilder);              // Para criar formulários reativos
  private pessoaService = inject(PessoaService);   // Serviço da API
  private messageService = inject(MessageService); // Para mensagens

  /** FormGroup: agrupa campos do formulário com validações */
  formPessoa!: FormGroup;

  /**
   * Inicialização do componente
   * Cria o formulário e popula com dados se for edição
   */
  ngOnInit(): void {
  // 1. Primeiro criamos o formulário
  this.inicializarFormulario();
  
  // 2. Depois verificamos se já recebemos dados para edição
  if (this.pessoaEdicao) {
    this.preencherFormulario(this.pessoaEdicao);
  }
}

ngOnChanges(changes: SimpleChanges): void {
  // Se a pessoa mudar enquanto o componente está aberto, atualizamos
  if (changes['pessoaEdicao'] && this.pessoaEdicao && this.formPessoa) {
    this.preencherFormulario(this.pessoaEdicao);
  }
}

// Criamos uma função auxiliar para tratar os dados antes de jogar no form
private preencherFormulario(dados: Pessoa) {
  // Fazemos uma cópia para não alterar o objeto original
  const dadosFormatados = { ...dados };

  // Formatamos o CPF e Telefone para a máscara aparecer na edição
  if (dadosFormatados.cpf) {
    dadosFormatados.cpf = this.aplicarMascaraCpfCnpj(dadosFormatados.cpf);
  }
  
  this.formPessoa.patchValue(dadosFormatados);
}

// Função auxiliar para formatar a string pura que vem do banco
private aplicarMascaraCpfCnpj(valor: string): string {
  valor = valor.replace(/\D/g, '');
  if (valor.length <= 11) {
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
}

  /**
   * Cria o FormGroup com validações
   * FormBuilder = ferramenta para criar formulários de forma mais limpa
   */
  private inicializarFormulario() {
    this.formPessoa = this.fb.group({
      id: [null],                                    
      nome: ['', [Validators.required]], 
      cpf: ['',[Validators.required,Validators.minLength(14),Validators.maxLength(18)]],
      telefone: ['',[Validators.required,Validators.minLength(8)]],
      endereco: ['',[Validators.required]],
      funcao: [], 
    });
  }

  /**
   * Valida e submete o formulário
   * Decide se é criação ou atualização baseado se tem ID
   */
  onSubmit() {
    // Se formulário é inválido, interrompe a submissão
    if (this.formPessoa.invalid) return;

    // Pega os valores do formulário
    const dadosEnvio: Pessoa = this.formPessoa.value;

    if (dadosEnvio.id) {
    this.editar(dadosEnvio);
  } else {
    this.salvar(dadosEnvio);
  }
  }

formatarCpfCnpj(event: any) {
  // 1. Remove tudo que não for número
  let valor = event.target.value.replace(/\D/g, '');

  // 2. Limita a 14 dígitos (tamanho máximo do CNPJ)
  if (valor.length > 14) {
    valor = valor.substring(0, 14);
  }

  // 3. Aplica a formatação dinamicamente
  if (valor.length <= 11) {
    // Máscara CPF: 000.000.000-00
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    // Máscara CNPJ: 00.000.000/0000-00
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  // 4. Atualiza o valor no formulário (sem disparar eventos infinitos)
  this.formPessoa.get('cpf')?.setValue(valor, { emitEvent: false });
}

  
  /**
   * Envia novo cadastro para o servidor
   * @param p - Nova pessoa a ser salva
   */
  private salvar(p: Pessoa) {
    this.pessoaService.salvarPessoa(p).subscribe({
      next: () => this.sucesso("Cadastrada"), // Sucesso
      error: (err) => console.error(err)       // Erro
    });
  }

 private editar(p: Pessoa) {
    this.pessoaService.atualizarPessoa(p).subscribe({
      next: () => this.sucesso("Editada"),
      error: (err) => console.error(err)
    });
  }

  /**
   * Exibe mensagem de sucesso e fecha o modal
   * @param msg - Tipo de ação: "Cadastrada" ou "Editada"
   */
  private sucesso(msg: string) {
  this.messageService.add({ 
    severity: 'success', 
    summary: 'Sucesso', 
    detail: `Pessoa ${msg} com sucesso!` 
  });

  // Emite o evento para o pai (Listar) saber que terminou
  this.fecharModal.emit(); 
  
  // Limpa o formulário para o próximo uso
  this.formPessoa.reset(); 
  
}

}
