import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  apiURL: string = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  salvar(tarefa: Tarefa) : Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiURL, tarefa)
  }

  listar() : Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiURL)
  }

  excluir(id: number) : Observable<void> {
    const url = `${this.apiURL}/${id}`
    return this.http.delete<void>(url)
  }

  concluirTarefa(id: number) : Observable<Tarefa> {
    const url = `${this.apiURL}/${id}/concluida`
    return this.http.patch<Tarefa>(url, {})
  }
}
