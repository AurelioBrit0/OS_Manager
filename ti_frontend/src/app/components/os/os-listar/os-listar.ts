import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OSCadastro } from '../os-cadastro/os-cadastro';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OS } from '../models/os';
import { OSService } from '../os-service';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, SquarePenIcon, Trash2Icon, Wrench } from 'lucide-angular';

/**
 * Componente responsável por listar e gerenciar Ordens de Serviço (OS)
 * Funcionalidades: visualizar todas as OS, criar nova, editar e deletar OS
 */
@Component({
  selector: 'app-os-listar',
  imports: [
    OSCadastro, 
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    TooltipModule,
    ConfirmDialogModule,
    InputTextModule,
    CardModule,
    ToastModule,
    InputGroupModule,
    BadgeModule,
    ProgressSpinnerModule,
    LucideAngularModule
  ],
  standalone: true,
  templateUrl: './os-listar.html',
  styleUrl: './os-listar.css',
  providers: [ConfirmationService, MessageService, OSService]
})
export class OSListar {
  
  // Ícones do Lucide para usar no template
  readonly SquarePenIcon = SquarePenIcon;
  readonly Trash2Icon = Trash2Icon;
  readonly wrench = Wrench;

  // Injeção de dependências
  private osService = inject(OSService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  // SIGNALS: Reatividade moderna do Angular
  
  /** Array de OS carregadas do backend */
  os_lista = signal<OS[]>([]);

  /** Controla a visibilidade do modal de cadastro/edição */
  exibirModal = signal<boolean>(false);
  
  /** OS selecionada para edição (null = novo cadastro) */
  osSelecionada = signal<OS | null>(null);
  
  /** Estado de carregamento dos dados */
  carregando = signal<boolean>(true);

  /**
   * Ciclo de vida do Angular: executado quando o componente é inicializado
   * Carrega as OS do servidor na primeira vez
   */
  ngOnInit(): void {
    this.buscarOS();
    
  }

  
  /**
   * Busca todas as OS do servidor
   * Trata estados: carregando, sucesso e erro
   */
  buscarOS(): void {
    this.carregando.set(true);
    this.osService.listarOS().subscribe({
      next: (dados) => {
        this.os_lista.set(dados);
        this.carregando.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar OS:', err);
        this.carregando.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar as Ordens de Serviço'
        });
      }
    });
  }

  /**
   * Abre modal para criar nova OS
   */
  abrirNovo(): void {
    this.osSelecionada.set(null);
    this.exibirModal.set(true);
  }

  /**
   * Abre modal para editar OS selecionada
   * @param os - OS a ser editada
   */
  abrirEdicao(os: OS): void {
    console.log('Produto selecionado para edição:', os);
    this.osSelecionada.set(os);
    this.exibirModal.set(true);
  }

 

  /**
   * Acionado quando o modal é fechado
   * Recarrega a lista de OS
   */
  aoFecharModal(): void {
    this.exibirModal.set(false);
    this.ngOnInit(); 
  }

  /**
   * Solicita confirmação e deleta a OS
   * @param os - OS a ser deletada
   */
  confirmarDelecao(os: OS): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja deletar a OS "${os.titulo}"?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletarOS(os.id!);
      }
    });
  }

  /**
   * Deleta a OS do servidor
   * @param id - ID da OS a deletar
   */
  private deletarOS(id: number): void {
    this.osService.deleteOS(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'OS deletada com sucesso!'
        });
        this.buscarOS();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao deletar a OS'
        });
      }
    });
  }

  /**
   * Retorna a cor do badge baseado no status
   * @param status - Status da OS
   */
  obterCorStatus(status: string): any {
    const cores: any = {
      'ABERTA': 'success',
      'FECHADA': 'secondary',
      'EM_EXECUÇÃO': 'info',
      'AGUARDANDO': 'warning'
    };
    return cores[status] || 'secondary';
  }

  /**
   * Retorna o label do status formatado
   * @param status - Status da OS
   */
  obterLabelStatus(status: string): string {
    const labels: any = {
      'ABERTA': 'Aberta',
      'FECHADA': 'Fechada',
      'EM_EXECUÇÃO': 'Em Execução',
      'AGUARDANDO': 'Aguardando'
    };
    return labels[status] || status;
  }

}
