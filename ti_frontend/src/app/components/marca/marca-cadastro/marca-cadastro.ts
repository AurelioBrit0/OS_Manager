import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter'; 
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Marca } from '../models/marca';
import { MessageService } from 'primeng/api';
import { MarcaService } from '../marca-service';

/**
 * Componente responsável por cadastrar e editar marcas
 * Pode ser usado em um modal ou em uma página dedicada
 */
@Component({
  selector: 'app-marca-cadastro',
  imports: [CommonModule,
    ButtonModule, 
    InputTextModule, 
    KeyFilterModule, 
    RippleModule, 
    ReactiveFormsModule,
    FormsModule ],
    standalone: true,
  templateUrl: './marca-cadastro.html',
  styleUrl: './marca-cadastro.css',
})
export class MarcaCadastro implements OnInit{

  visible: boolean = false;

  /**
   * Abre um dialog (não está sendo usado no modal atual)
   */
  showDialog() {
    this.visible = true;
  }

  /** Marca passada de fora para edição (Input) */
  @Input() marcaEdicao: Marca | null = null;
  
  /** Evento emitido quando modal deve ser fechado (Output) */
  @Output() fecharModal = new EventEmitter<void>();
  @Input() redirecionarAposSalvar: boolean = true;

  // Injeção de dependências
  private fb = inject(FormBuilder);              // Para criar formulários reativos
  private marcaService = inject(MarcaService);   // Serviço da API
  private router = inject(Router);               // Para navegação
  private messageService = inject(MessageService); // Para mensagens

  /** FormGroup: agrupa campos do formulário com validações */
  formMarca!: FormGroup;

  /**
   * Inicialização do componente
   * Cria o formulário e popula com dados se for edição
   */
  ngOnInit(): void {
    this.inicializarFormulario();

    // Se marcaEdicao foi passada como Input, preenche o formulário com os dados
    if (this.marcaEdicao) {
      this.formMarca.patchValue(this.marcaEdicao);
    }
  }

  /**
   * Cria o FormGroup com validações
   * FormBuilder = ferramenta para criar formulários de forma mais limpa
   */
  private inicializarFormulario() {
    this.formMarca = this.fb.group({
      id: [null],                                    // ID (será null para novo)
      nome: ['', [Validators.required, Validators.minLength(3)]],  // Requerido, mín 3 caracteres
    });
  }

  /**
   * Valida e submete o formulário
   * Decide se é criação ou atualização baseado se tem ID
   */
  onSubmit() {
    // Se formulário é inválido, interrompe a submissão
    if (this.formMarca.invalid) return;

    // Pega os valores do formulário
    const dadosEnvio: Marca = this.formMarca.value;

   this.salvar(dadosEnvio);
  }

  /**
   * Envia novo cadastro para o servidor
   * @param m - Nova marca a ser salva
   */
  private salvar(m: Marca) {
    this.marcaService.salvarMarca(m).subscribe({
      next: () => this.sucesso("Cadastrada"), // Sucesso
      error: (err) => console.error(err)       // Erro
    });
  }

//   /**
//    * Envia atualização para o servidor
//    * @param m - Marca com dados atualizados
//    */
//   private editar(m: Marca) {
//     this.marcaService.atualizarMarca(m).subscribe({
//       next: () => this.sucesso("Editada"),  // Sucesso
//       error: (err) => console.error(err)     // Erro
//     });
//   }

  /**
   * Exibe mensagem de sucesso e fecha o modal
   * @param msg - Tipo de ação: "Cadastrada" ou "Editada"
   */
  private sucesso(msg: string) {
  alert(`Marca ${msg} com sucesso!`);

  // Sempre fecha o modal (se estiver sendo usado como modal)
  this.fecharModal.emit();

  // Só redireciona se permitido
  if (this.redirecionarAposSalvar) {
    this.router.navigate(['/marca/listar']);
  }
}
}
