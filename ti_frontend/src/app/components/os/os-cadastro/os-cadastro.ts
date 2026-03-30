import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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

/**
 * Componente responsável por cadastrar e editar Ordens de Serviço (OS)
 * Pode ser usado em um modal ou em uma página dedicada
 */
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
    FormsModule
  ],
  standalone: true,
  templateUrl: './os-cadastro.html',
  styleUrl: './os-cadastro.css',
})
export class OSCadastro implements OnInit {

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  /** OS passada de fora para edição (Input) */
  @Input() osEdicao: OS | null = null;
  
  /** Evento emitido quando modal deve ser fechado (Output) */
  @Output() fecharModal = new EventEmitter<void>();
  @Input() redirecionarAposSalvar: boolean = true;

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

    // Se osEdicao foi passada como Input, preenche o formulário com os dados
    if (this.osEdicao) {
      // Converte data para formato YYYY-MM-DD que input[type=date] espera
      const formatarData = (data: any) => {
        if (!data) return null;
        const d = new Date(data);
        const ano = d.getFullYear();
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const dia = String(d.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
      };
      
      const osParaEditar = {
        ...this.osEdicao,
        dataAbertura: formatarData(this.osEdicao.dataAbertura),
        dataFechamento: formatarData(this.osEdicao.dataFechamento)
      };
      this.formOS.patchValue(osParaEditar);
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
      dataFechamento: [''],
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

    // Formata as datas para LocalDateTime (YYYY-MM-DDTHH:mm:ss)
    const osFormatada = this.formatarDatasParaBackend(dadosEnvio);

    if (osFormatada.id) {
      this.editar(osFormatada);
    } else {
      this.salvar(osFormatada);
    }
  }

  /**
   * Formata as datas do formulário para formato LocalDateTime esperado pelo backend
   * Converte YYYY-MM-DD para YYYY-MM-DDTHH:mm:ss
   */
 private formatarDataBR(data: string): string {
  if (!data) return '';

  const d = new Date(data);

  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();

  return `${dia}/${mes}/${ano} 00:00:00`;
}

private formatarDatasParaBackend(os: OS): any {
  return {
    ...os,
    dataAbertura: os.dataAbertura ? this.formatarDataBR(os.dataAbertura) : null,
    dataFechamento: os.dataFechamento ? this.formatarDataBR(os.dataFechamento) : null
  };
}


  private limparFormulario() {
    this.formOS.reset();

    this.formOS.patchValue({
        status: 'NOVO'
    });

    this.osEdicao = null;
}

  /**
   * Envia novo cadastro para o servidor
   * @param os - Nova OS a ser salva
   */
  private salvar(os: OS) {
    this.osService.salvarOS(os).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'OS cadastrada com sucesso!'
        });

        this.limparFormulario();

        this.fecharModal.emit();

        if (this.redirecionarAposSalvar) {
          this.router.navigate(['/os/listar']);
        }
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

  /**
   * Envia atualização para o servidor
   * @param os - OS a ser atualizada
   */
  private editar(os: OS) {
    this.osService.atualizarOS(os).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'OS atualizada com sucesso!'
        });
        this.fecharModal.emit();

        if (this.redirecionarAposSalvar) {
          this.router.navigate(['/os/listar']);
        }
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
