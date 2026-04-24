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

@Component({
  selector: 'app-pessoa-cadastro',
  imports: [CommonModule,
    ButtonModule, 
    InputTextModule, 
    KeyFilterModule, 
    RippleModule, 
    ReactiveFormsModule,
    FormsModule],
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
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pessoaEdicao'] && this.pessoaEdicao) {
      this.formPessoa.patchValue(this.pessoaEdicao);
    }
  }

  /**
   * Cria o FormGroup com validações
   * FormBuilder = ferramenta para criar formulários de forma mais limpa
   */
  private inicializarFormulario() {
    this.formPessoa = this.fb.group({
      id: [null],                                    // ID (será null para novo)
      nome: ['', [Validators.required, Validators.minLength(1)]],  // Requerido, mín 1 caractere
      cpf: ['',[Validators.required,Validators.minLength(11),Validators.maxLength(12)]],
     // cnpj: ['',[Validators.required,Validators.minLength(14),Validators.maxLength(14)]],
      telefone: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]],
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
  alert(`Pessoa ${msg} com sucesso!`);

  // Sempre fecha o modal (se estiver sendo usado como modal)
  this.fecharModal.emit();
  this.inicializarFormulario();
  window.location.reload();  
  }

}
