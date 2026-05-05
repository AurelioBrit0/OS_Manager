import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
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
import { ProdutoService } from '../../produto/produto-services';
import { Produto } from '../../produto/models/model';
import { PessoaService } from '../../pessoa/pessoa-services';

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
    DatePickerModule,
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

  /** OS passada de fora para edição (Input) */
  @Input() produtoEdicao: Produto | null = null;
  @Input() osEdicao: OS | null = null;
  
  /** Evento emitido quando modal deve ser fechado (Output) */
  @Output() fecharModal = new EventEmitter<void>();

  // Injeção de dependências
  private fb = inject(FormBuilder);
  private osService = inject(OSService);
  private messageService = inject(MessageService);
  private produtoService = inject(ProdutoService);
  private pessoaService = inject(PessoaService);
  listarProdutos: any[] = [];
  listarPessoas: any[] = [];
  produtos: any;
  produtoSelecionado: any = null;
  pessoaSelecionada: any = null;
  ProdutosFiltrados: any[] = [];
  exibirModalProduto: boolean = false;

  /** FormGroup: agrupa campos do formulário com validações */
  formOS!: FormGroup;

  /**
   * Inicialização do componente
   * Cria o formulário e popula com dados se for edição
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarProdutos();
    this.carregarPessoas();
  }

  ngOnChanges(changes: SimpleChanges): void {
     if (changes['osEdicao'] && this.osEdicao && this.formOS) {
      const converterData = (data: string) => {
      if (!data) return null;

      const [dia, mes, ano] = data.split('/');
      return new Date(Number(ano), Number(mes) - 1, Number(dia));
    };

      this.formOS.patchValue({
        ...this.osEdicao,
        dataAbertura: this.osEdicao.dataAbertura ? converterData(this.osEdicao.dataAbertura) : null,
        dataFechamento: this.osEdicao.dataFechamento ? converterData(this.osEdicao.dataFechamento) : null
      });

      if (this.osEdicao.pessoa) {
        this.pessoaSelecionada = this.listarPessoas.find(
          p => p.id === this.osEdicao!.pessoa.id
        );
      }
    }
  }

    carregarProdutos(): void {
  this.produtoService.listarProdutos().subscribe({
    next: (produtos: any[]) => {
      this.listarProdutos = produtos;

      if (this.produtoEdicao?.marca) {
        this.produtoSelecionado = this.listarProdutos.find(
          m => m.id === this.osEdicao!.produto.id
        );
      }
    }
  });
}

  carregarPessoas(): void {
  this.pessoaService.listarPessoa().subscribe({
    next: (pessoas: any[]) => {
      this.listarPessoas = pessoas;

      if (this.osEdicao?.pessoa) {
        this.pessoaSelecionada = this.listarPessoas.find(
          p => p.id === this.osEdicao!.pessoa.id
        );
      }
    }
  });
}

   
  /**
   * Formata a data de Date para string no formato esperado pelo backend (YYYY-MM-DDTHH:mm:ss)
   */
  private formatarDataParaBackend(data: Date | null | undefined): string | null {
    if (!data) return null;

    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    

    return `${dia}/${mes}/${ano}`;
  }

 private inicializarFormulario() {
  this.formOS = this.fb.group({
    id: [null],
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    descricao: ['', [Validators.required, Validators.minLength(5)]],
    comentario: [''],
    dataAbertura: [null], 
    dataFechamento: [null],
    status: ['NOVO'], 
    valor: [0, [Validators.required, Validators.min(0)]],
    pessoa: [null],
    produto: [null],
  });
}


  
  /**
   * Valida e submete o formulário
   * Decide se é criação ou atualização baseado se tem ID
   */
  onSubmit() {
  if (this.formOS.invalid) return;

  const dadosFormulario = this.formOS.value;
  
  const dadosEnvio: any = {
    ...dadosFormulario,
    dataAbertura: this.formatarDataParaBackend(dadosFormulario.dataAbertura),
    dataFechamento: this.formatarDataParaBackend(dadosFormulario.dataFechamento)
  };


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

 
  private editar(os: any) {
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


  // Essa função ensina o Angular a comparar os objetos pelo ID
compararObjetos(o1: any, o2: any): boolean {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
}


}
