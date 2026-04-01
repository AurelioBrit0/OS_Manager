import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter'; 
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OS } from '../models/os';
import { MessageService } from 'primeng/api';
import { OSService } from '../os-service';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-os-cadastro',
  imports: [
    CommonModule,
    ButtonModule, 
    InputTextModule, 
    KeyFilterModule, 
    RippleModule, 
    ReactiveFormsModule,
    InputNumberModule,
    FormsModule,
    DatePickerModule
  ],
  standalone: true,
  templateUrl: './os-cadastro.html',
  styleUrl: './os-cadastro.css',
})
export class OSCadastro implements OnInit, OnChanges {

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  date: Date | undefined;
  /** OS passada de fora para edição (Input) */
  @Input() osEdicao: OS | null = null;
  
  /** Evento emitido quando modal deve ser fechado (Output) */
  @Output() fecharModal = new EventEmitter<void>();

  // Injeção de dependências
  private fb = inject(FormBuilder);
  private osService = inject(OSService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  /** FormGroup: agrupa campos do formulário com validações */
  formOS!: FormGroup;

  /**
   * Inicialização do componente
   * Cria o formulário e popula com dados se for edição
   */
  ngOnInit(): void {
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['osEdicao'] && this.osEdicao) {
      this.formOS.patchValue(this.osEdicao);
    }
  }

  /**
   * Cria o FormGroup com validações
   */
  private inicializarFormulario() {
    this.formOS = this.fb.group({
      id: [null],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(5)]],
      comentario: [''],
      dataAbertura: [''],
      horaAbertura: [''],
      dataFechamento: [''],
      horaFechamento: [''],
      status: ['NOVO', Validators.required],
    //   pessoa: [''],
    //   produto: [''],
      valor: [''],
    });
  }

  /**
   * Valida e submete o formulário
   * Decide se é criação ou atualização baseado se tem ID
   */
  onSubmit() {
    
    // Se formulário é inválido, interrompe a submissão
    if (this.formOS.invalid) return;

    // Pega os valores do formulário
    const dadosEnvio: OS = this.formOS.value;


    if (dadosEnvio.id) {
      this.editar(dadosEnvio);
    } else {
      this.salvar(dadosEnvio);
    }
  }

  private salvar(os: OS) {
    this.osService.salvarOS(os).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'OS cadastrada com sucesso!'
        });
        this.formOS.reset();
        this.fecharModal.emit();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao cadastrar a OS'
        });
      }
    });
  }

 
  private editar(os: OS) {
    this.osService.atualizarOS(os).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'OS atualizada com sucesso!'
        });
        this.formOS.reset();
        this.fecharModal.emit();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar a OS'
        });
      }
    });
  }
}
