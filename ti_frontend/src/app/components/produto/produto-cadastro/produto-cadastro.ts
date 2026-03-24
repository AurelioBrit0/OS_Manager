import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter'; 
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Produto } from '../models/model';
import { ProdutoService } from '../produto-services';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageService } from 'primeng/api';
import { MarcaService } from '../../marca/marca-service';


@Component({
  selector: 'app-produto-cadastro',
  imports: [CommonModule,
    ButtonModule, 
    InputTextModule, 
    InputMaskModule, 
    KeyFilterModule, 
    RippleModule, 
    ReactiveFormsModule,
    InputNumberModule,
    AutoCompleteModule,
    FormsModule ],
    standalone: true,
  templateUrl: './produto-cadastro.html',
  styleUrl: './produto-cadastro.css',
})
export class ProdutoCadastro implements OnInit{

  visible: boolean = false;

  
    showDialog() {
        this.visible = true;
    }


  @Input() produtoEdicao: Produto | null = null;
  @Output() fecharModal = new EventEmitter<void>();

  
  private fb = inject(FormBuilder);
  private ProdutoService = inject(ProdutoService);
  private router = inject(Router);
  private marcaService = inject(MarcaService);
  private messageService = inject(MessageService);

  formProduto!: FormGroup;

  listarMarcas: any[] = [];
  marcas: any;
  marcaSelecionada: any = null;
  marcasFiltradas: any[] = [];
  

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarMarcas();

    if (this.produtoEdicao) {
      this.formProduto.patchValue(this.produtoEdicao);
      
    }
  }


  carregarMarcas(): void {
    this.marcaService.listarMarca().subscribe({
      next: (marcas: any[]) => {

        this.listarMarcas = marcas.filter(
          (v, i, a) =>
            a.findIndex(t => t.nome.toLowerCase() === v.nome.toLowerCase()) === i
        );

      },
      error: (err) => console.error('Erro ao carregar lista de marcas:', err),
    });
  }


@ViewChild('auto') autoComplete: any;

abrirDropdown() {
  this.marcasFiltradas = [...this.marcas]; 

  setTimeout(() => {
    this.autoComplete.show(); 
  }, 0);

}
    

  private inicializarFormulario() {
    this.formProduto = this.fb.group({
      id: [null],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: [''],
      valor: ['', [Validators.required, Validators.min(0)]],
      quantidade: ['', [Validators.required, Validators.min(0)]],
      marca: [''] 
    });
  }

  onSubmit() {
  if (this.formProduto.invalid) return;

  const dadosEnvio: Produto = {
    ...this.formProduto.value,
    marca: this.marcaSelecionada
  };

  if (dadosEnvio.id) {
    this.editar(dadosEnvio);
  } else {
    this.salvar(dadosEnvio);
  }
}

  private salvar(p: Produto) {
    this.ProdutoService.salvarProduto(p).subscribe({
      next: () => this.sucesso("Cadastrado"),
      error: (err) => console.error(err)
    });
  }

  private editar(p: Produto) {
    this.ProdutoService.atualizarProduto(p).subscribe({
      next: () => this.sucesso("Editado"),
      error: (err) => console.error(err)
    });
  }

  private sucesso(msg: string) {
    alert(`Produto ${msg} com sucesso!`);
    this.fecharModal.emit();
    this.router.navigate(['/produto/listar']);
  }

}
