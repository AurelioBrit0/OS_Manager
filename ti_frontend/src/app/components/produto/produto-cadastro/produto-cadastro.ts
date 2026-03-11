import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter'; 
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Produto } from '../models/model';
import { ProdutoService } from '../produto-services';
import { InputNumberModule } from 'primeng/inputnumber';


@Component({
  selector: 'app-produto-cadastro',
  imports: [CommonModule,
    ButtonModule, 
    InputTextModule, 
    InputMaskModule, 
    KeyFilterModule, 
    RippleModule, 
    ReactiveFormsModule,
  InputNumberModule ],
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


  formProduto!: FormGroup;

  ngOnInit(): void {
    this.inicializarFormulario();

   
    if (this.produtoEdicao) {
      this.formProduto.patchValue(this.produtoEdicao);
    }
  }

  private inicializarFormulario() {
    this.formProduto = this.fb.group({
      id: [null],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: [''],
      valor: ['', [Validators.required, Validators.min(0)]],
      quantidade: ['', [Validators.required, Validators.min(0)]],
      marca: [''],
    });
  }

  onSubmit() {
    if (this.formProduto.invalid) {
      return; // Não deixa enviar se estiver inválido
    }

    const dadosEnvio: Produto = this.formProduto.value;

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
