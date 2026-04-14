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
import { ConfirmationService, MessageService } from 'primeng/api';
import { Produto } from '../models/model';
import { ProdutoService } from '../produto-services';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import {LucideAngularModule, Package, SquarePenIcon , Trash2Icon} from 'lucide-angular';
import { MarcaService } from '../../marca/marca-service';



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
    CardModule,
    ToastModule,
    InputGroupModule,
    BadgeModule,
    LucideAngularModule
  ],
  standalone: true,
  templateUrl: './produto-listar.html',
  styleUrl: './produto-listar.css',
  providers: [ConfirmationService, MessageService,ProdutoService]
})
export class ProdutoListar {
  
  readonly SquarePenIcon = SquarePenIcon;
  readonly Trash2Icon = Trash2Icon;
  readonly package = Package;
    
  private produtoService = inject(ProdutoService);
  private confirmationService = inject(ConfirmationService);
  private marcaService = inject(MarcaService);

  // Estados da Tela usando Signals
  marca = signal<any[]>([]);
  produtos = signal<Produto[]>([]);
  exibirModal = signal<boolean>(false);
  produtoSelecionado = signal<Produto | null>(null);
  marcaSelecionada: any = null;
  carregando = signal<boolean>(true);
  products!: Produto[];
  
  ngOnInit(): void {
    this.buscarProdutos();
    this.produtoService.listarProdutos().subscribe((data) => {
            this.produtos.set(data);
        });
         this.marcaService.listarMarca().subscribe({
      next: (dados) => {
        this.marca.set(dados);
      }
    });
  }

  buscarProdutos(): void {
    this.carregando.set(true);
    this.marcaService.listarMarca().subscribe({
      next: (dados) => {
        this.marca.set(dados);
      }
    });

    this.produtoService.buscarProdutoPorId('localhost:8080/produto/buscar-produto/${id}').subscribe({
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
    console.log('Produto selecionado para edição:', produto);
    this.produtoSelecionado.set(produto); // Passa o produto clicado para o modal
    // this.marcaSelecionada.set(produto.marca);
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
            this.ngOnInit();
          },
          error: (erro) => {
            console.error('Erro ao excluir produto:', erro);
          }
        });
      }
    });
  }
    

   

    rowClass(produto: Produto) {
        return { '!bg-primary !text-primary-contrast': this.produtos().some(p => p.marca === 'Fitness') };
    }

    rowStyle(product: Produto) {
        if (product.quantidade === 0) {
            return { fontWeight: 'bold', fontStyle: 'italic' };
        } else if (product.quantidade > 0 && product.quantidade < 10) {
            return { fontStyle: 'italic' };
        } else {
            return {};
        }
    }

    stockSeverity(product: Produto) {
        if (product.quantidade === 0 || product.quantidade <= 1) return 'danger';
        else if (product.quantidade > 0 && product.quantidade < 10) return 'warn';
        else   return 'success';
    }
}
