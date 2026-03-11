import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProdutoCadastro } from '../produto-cadastro/produto-cadastro';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ConfirmationService } from 'primeng/api';
import { Produto } from '../models/model';
import { ProdutoService } from '../produto-services';



@Component({
  selector: 'app-produto-listar',
  imports: [ProdutoCadastro, 
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    TooltipModule,
    ConfirmDialogModule,
    InputTextModule,
    InputGroupModule
  ],
  standalone: true,
  templateUrl: './produto-listar.html',
  styleUrl: './produto-listar.css',
  providers: [ConfirmationService]
})
export class ProdutoListar {
  
    
  private produtoService = inject(ProdutoService);
  private confirmationService = inject(ConfirmationService);

  // Estados da Tela usando Signals
  produtos = signal<Produto[]>([]);
  exibirModal = signal<boolean>(false);
  produtoSelecionado = signal<Produto | null>(null);
  carregando = signal<boolean>(true);

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos(): void {
    this.carregando.set(true);
    this.produtoService.listarProdutos().subscribe({
      next: (dados) => {
        this.produtos.set(dados);
        this.carregando.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
        this.carregando.set(false);
      }
    });
  }

  abrirNovo(): void {
    this.produtoSelecionado.set(null); // Limpa para garantir que é um novo cadastro
    this.exibirModal.set(true);
  }

  abrirEdicao(produto : Produto): void {
    this.produtoSelecionado.set(produto); // Passa o produto clicado para o modal
    this.exibirModal.set(true);
  }

  aoFecharModal(): void {
    this.exibirModal.set(false);
    this.buscarProdutos(); // Recarrega a lista para mostrar as mudanças
  }

  excluirProduto(produto: Produto): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o produto "${produto.nome}"?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'btn-confirm-success',
      rejectButtonStyleClass: 'btn-confirm-danger',
      accept: () => {
        this.produtoService.deleteProduto(produto.id!).subscribe({
          next: () => {
            this.buscarProdutos();
          },
          error: (erro) => {
            console.error('Erro ao excluir produto:', erro);
          }
        });
      }
    });
  }
    
}
