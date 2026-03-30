import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class OSService {

  urlOS: string = 'http://localhost:8080/os';

  constructor(private readonly httpOS: HttpClient) {}

  listarOS() {
    return this.httpOS.get<any[]>(`${this.urlOS}/listar`);
  }

  salvarOS(os: any) {
    return this.httpOS.post(`${this.urlOS}/salvar-os`, os);
  }

  buscarOSPorId(id: any) {
    return this.httpOS.get<any>(`${this.urlOS}/buscar-os/${id}`);
  }

  atualizarOS(os: any) {
    return this.httpOS.put<any>(`${this.urlOS}/atualizar-os/${os.id}`, os);
  }

  deleteOS(id: string | number) {
    return this.httpOS.delete(`${this.urlOS}/deletar-os/${id}`);
  }

}
