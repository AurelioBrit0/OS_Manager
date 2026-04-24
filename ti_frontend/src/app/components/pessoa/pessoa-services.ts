import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PessoaService {

  urlPessoa: string = 'http://localhost:8080/pessoa';

  constructor(private readonly httpPessoa: HttpClient) {}

  listarPessoa() {
    return this.httpPessoa.get<any[]>(`${this.urlPessoa}/listar`);
  }

  salvarPessoa (pessoa: any) {
    return this.httpPessoa.post(`${this.urlPessoa}/salvar-pessoa`, pessoa);
  }

   buscarPessoaPorId(id: any) {
    return this.httpPessoa.get<any>(`${this.urlPessoa}/buscar-pessoa/${id}`);
  }

   atualizarPessoa(pessoa  : any) {
    return this.httpPessoa.put<any>(`${this.urlPessoa}/atualizar-pessoa/${pessoa.id}`, pessoa);
  }

  deletePessoa(id: any) {
    return this.httpPessoa.delete(`${this.urlPessoa}/deletar-pessoa/${id}`);
  }

}
