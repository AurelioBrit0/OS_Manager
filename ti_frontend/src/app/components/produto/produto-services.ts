
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  urlProduto: string = "http://localhost:8080/produto";

  constructor(private readonly httpProduto: HttpClient) {}

  listarProdutos() {
     return this.httpProduto.get<any[]>(`${this.urlProduto}/listar`);
  }

  salvarProduto(produto: any) {
    return this.httpProduto.post<any>(`${this.urlProduto}/salvar-produto`, produto);
  }

  buscarProdutoPorId(id: string) {
    return this.httpProduto.get<any>(`${this.urlProduto}/buscar-produto/${id}`);
  }

  atualizarProduto(produto  : any) {
    return this.httpProduto.put<any>(`${this.urlProduto}/atualizar-produto/${produto.id}`, produto);
  }

  deleteProduto(id: string|number) {
    return this.httpProduto.delete(`${this.urlProduto}/deletar-produto/${id}`);
  }


}
