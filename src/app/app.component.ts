import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from './tarefa';
import { TarefaService } from './tarefa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  tarefas: Tarefa[] = []

  form: FormGroup = new FormGroup({
    descricao : new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  constructor(
    private service: TarefaService
  ){}
  
  ngOnInit(){
    this.listarTarefas();
  }

  listarTarefas(){
    this.service.listar().subscribe(tarefasListadas => {
      this.tarefas = tarefasListadas
    })
  }

  submit(){
    console.log(this.form.value);
    const tarefa: Tarefa = { ...this.form.value } //this.form.value;
    this.service
        .salvar(tarefa)
        .subscribe(tarefaSalva => {
          this.tarefas.push(tarefaSalva);
          this.form.reset();
        });
  }

  excluir(tarefa: Tarefa){
    this.service.excluir(tarefa.id).subscribe({
      next: (response) => this.listarTarefas()
    });
  }

  concluir(tarefa: Tarefa){
    this.service.concluirTarefa(tarefa.id).subscribe({
      next: (tarefaAtualizada) => {
        tarefa.concluida = tarefaAtualizada.concluida
        tarefa.dataConclusao = tarefaAtualizada.dataConclusao
      }
    });
  }
}
