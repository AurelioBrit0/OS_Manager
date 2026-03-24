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
}
