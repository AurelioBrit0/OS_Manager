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

// Adicione estes métodos dentro da sua classe

  formatarCpfCnpj(valor: string | undefined): string {
    if (!valor) return '';
    const apenasNumeros = valor.replace(/\D/g, '');

    if (apenasNumeros.length === 11) {
      // Formata CPF: 000.000.000-00
      return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (apenasNumeros.length === 14) {
      // Formata CNPJ: 00.000.000/0000-00
      return apenasNumeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return valor; // Se não tiver 11 nem 14, retorna o original
  }

  formatarTelefone(valor: string | undefined): string {
    if (!valor) return '';
    const apenasNumeros = valor.replace(/\D/g, '');

    if (apenasNumeros.length === 11) {
      // Formata Celular: (99) 99999-9999
      return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (apenasNumeros.length === 10) {
      // Formata Fixo: (99) 9999-9999
      return apenasNumeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return valor;
  }

 buscarPessoas(): void {
  this.carregando.set(true);

  // CORREÇÃO: Chame o método listarPessoa() que devolve o array completo
  this.pessoaService.listarPessoa().subscribe({
    next: (dados) => {
      this.pessoa.set(dados); // O Signal atualiza a tabela automaticamente
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
    // 1. Fecha a janela
  this.exibirModal.set(false);
  
  // 2. Limpa a seleção (para não abrir o próximo como edição por engano)
  this.pessoaSelecionada.set(null);
  
  // 3. CHAMA A BUSCA AQUI! 
  // Isso vai fazer o Angular buscar os dados novos e atualizar a tabela sem piscar a tela.
  this.buscarPessoas(); 
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
