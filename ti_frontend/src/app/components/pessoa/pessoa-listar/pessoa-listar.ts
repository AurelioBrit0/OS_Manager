import { Component, inject, Input, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import {LucideAngularModule, User, SquarePenIcon , Trash2Icon} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { PessoaCadastro } from '../pessoa-cadastro/pessoa-cadastro';
import { PessoaService } from '../pessoa-services';
import { Pessoa } from '../model/pessoa';


@Component({
  selector: 'app-pessoa-listar',
  imports: [
    PessoaCadastro, 
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
  templateUrl: './pessoa-listar.html',
  styleUrl: './pessoa-listar.css',
  providers: [ConfirmationService, MessageService, PessoaService]
})
export class PessoaListar {

  readonly SquarePenIcon = SquarePenIcon;
  readonly Trash2Icon = Trash2Icon;
  readonly User = User;
    
  private pessoaService = inject(PessoaService);
  private confirmationService = inject(ConfirmationService);

   @Input() pessoaEdicao: Pessoa | null = null;
  // Estados da Tela usando Signals
  pessoa = signal<Pessoa[]>([]);
  exibirModal = signal<boolean>(false);
  pessoaSelecionada = signal<Pessoa | null>(null);
  carregando = signal<boolean>(true);
  
  ngOnInit(): void {
    this.buscarPessoas();
    this.pessoaService.listarPessoa().subscribe((data) => {
            this.pessoa.set(data);
        });
  }



  buscarPessoas(): void {
    this.carregando.set(true);

    this.pessoaService.buscarPessoaPorId('localhost:8080/pessoa/buscar-pessoa/${id}').subscribe({
      next: (dados) => {
        this.pessoa.set(dados);
        this.carregando.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar pessoas:', err);
        this.carregando.set(false);
      }
    });
  }

  abrirNovo(): void {
    this.pessoaSelecionada.set(null); // Limpa para garantir que é um novo cadastro
    this.exibirModal.set(true);
  }

  abrirEdicao(pessoa : Pessoa): void {
    console.log('Pessoa selecionado para edição:', pessoa);
    this.pessoaSelecionada.set(pessoa); 
    this.exibirModal.set(true);
  }

  aoFecharModal(): void {
    this.exibirModal.set(false);
    this.buscarPessoas(); // Recarrega a lista para mostrar as mudanças
  }

  excluirPessoa(pessoa: Pessoa): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o pessoa "${pessoa.nome}"?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'btn-confirm-success',
      rejectButtonStyleClass: 'btn-confirm-danger',
      accept: () => {
        this.pessoaService.deletePessoa(pessoa.id!).subscribe({
          next: () => {
            this.buscarPessoas();
            this.ngOnInit();
          },
          error: (erro) => {
            console.error('Erro ao excluir pessoa:', erro);
          }
        });
      }
    });
  }
    

    
}
