import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MarcaService {

  urlMarca: string = 'http://localhost:8080/marca';

  constructor(private readonly httpMarca: HttpClient) {}

  listarMarca() {
    return this.httpMarca.get<any[]>(`${this.urlMarca}/listar`);
  }

  salvarMarca(marca: any) {
    return this.httpMarca.post(`${this.urlMarca}/salvar-marca`, marca);
  }

   buscarMarcaPorId(id: any) {
    return this.httpMarca.get<any>(`${this.urlMarca}/buscar-marca/${id}`);
  }

   atualizarMarca(marca  : any) {
    return this.httpMarca.put<any>(`${this.urlMarca}/atualizar-marca/${marca.id}`, marca);
  }

  deleteMarca(id: string|number) {
    return this.httpMarca.delete(`${this.urlMarca}/deletar-marca/${id}`);
  }

}
