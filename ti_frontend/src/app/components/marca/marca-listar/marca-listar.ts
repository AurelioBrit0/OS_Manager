import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MarcaCadastro } from '../marca-cadastro/marca-cadastro';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Marca } from '../models/marca';
import { MarcaService } from '../marca-service';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import {LucideAngularModule, SquarePenIcon , Trash2Icon, Tag} from 'lucide-angular';

/**
 * Componente responsável por listar e gerenciar marcas
 * Funcionalidades: visualizar todas as marcas, criar nova, editar e deletar marcas
 */
@Component({
  selector: 'app-marca-listar',
  // Importa todos os módulos necessários para o template e comportamento
  imports: [MarcaCadastro, 
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
    LucideAngularModule
  ],
  standalone: true,
  templateUrl: './marca-listar.html',
  styleUrl: './marca-listar.css',
  // Provedores de serviços e confirmação
  providers: [ConfirmationService, MessageService, MarcaService]
})
export class MarcaListar {
  
  // Ícones do Lucide para usar no template
  readonly SquarePenIcon = SquarePenIcon; // Ícone de edição
  readonly Trash2Icon = Trash2Icon;       // Ícone de lixeira (deletar)
  readonly tag = Tag;                     // Ícone de tag (marca)
    
  // Injeção de dependências: serviço de marca e serviço de confirmação
  private marcaService = inject(MarcaService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  
  // SIGNALS: Reatividade moderna do Angular (substituem Observable em muitos casos)
  // Signal = uma forma mais simples e performática de gerenciar estado
  
  /** Array de marcas carregadas do backend */
  marcas = signal<Marca[]>([]);
  
  /** Controla a visibilidade do modal de cadastro/edição */
  exibirModal = signal<boolean>(false);
  
  /** Marca selecionada para edição (null = novo cadastro) */
  marcaSelecionada = signal<Marca | null>(null);
  
  /** Estado de carregamento dos dados */
  carregando = signal<boolean>(true);
  
  /**
   * Ciclo de vida do Angular: executado quando o componente é inicializado
   * Carrega as marcas do servidor na primeira vez
   */
  ngOnInit(): void {
    this.buscarMarcas();
    this.marcaService.listarMarca().subscribe({
      next: (dados) => {
        this.marcas.set(dados);
      }
    });
  }

  /**
   * Busca todas as marcas do servidor
   * Trata estados: carregando, sucesso e erro
   */
  buscarMarcas(): void {
    this.carregando.set(true); // Mostra spinner de carregamento
    this.marcaService.listarMarca().subscribe({
      next: (dados) => {
        // Sucesso: atualiza o signal com os dados recebidos
        this.marcas.set(dados);
        this.carregando.set(false); // Para o spinner
      },
      error: (err) => {
        // Erro: log no console e para o spinner
        console.error('Erro ao buscar marcas:', err);
        this.carregando.set(false);
      }
    });
  }

  /**
   * Abre o modal para criar uma nova marca
   * Reseta marcaSelecionada para null (sinal de novo cadastro)
   */
  abrirNovo(): void {
    this.marcaSelecionada.set(null); // Limpa seleção = modo "criar novo"
    this.exibirModal.set(true);      // Abre o modal
  }

  /**
   * Abre o modal para editar uma marca existente
   * @param marca - A marca a ser editada
   */
  abrirEdicao(marca : Marca): void {
    console.log('Marca selecionada para edição:', marca);
    this.marcaSelecionada.set(marca); // Define qual marca está sendo editada
    this.exibirModal.set(true);       // Abre o modal
  }

  
  /**
   * Fecha o modal e recarrega a lista de marcas
   * Chamado após salvar ou cancelar a edição
   */
  aoFecharModal(): void {
    this.exibirModal.set(false); // Fecha o modal
    this.buscarMarcas();         // Recarrega a lista para mostrar atualizações
  }

  excluirMarca(marca: Marca): void {
      this.confirmationService.confirm({
        message: `Tem certeza que deseja excluir a marca "${marca.nome}"?`,
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        acceptButtonStyleClass: 'btn-confirm-success',
        rejectButtonStyleClass: 'btn-confirm-danger',
        accept: () => {
          this.marcaService.deleteMarca(marca.id!).subscribe({
            next: () => {
              this.buscarMarcas();
            },
            error: (erro) => {
              console.error('Erro ao excluir marca:', erro);
               this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não é possível excluir a marca, pois existem produtos vinculados a ela!'
            });
            }
          });
        }
      });
    }

  /**
   * Exibe mensagem de sucesso para o usuário
   * @param msg - Mensagem a ser exibida
   */
  private sucesso(msg: string) {
    alert(msg); // Simples alert - pode ser melhorado com Toast do PrimeNG
  }

}
