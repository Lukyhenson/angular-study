import { Component, EventEmitter, OnInit, Input, Output, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/subject'

import { Contato } from "./contato.model"
import { ContatoService } from "./contato.service"

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer:hover {
            cursor: pointer;
        }
    `]
})

export class ContatoBuscaComponent implements OnInit, OnChanges {
    @Input() busca: string
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>()
    contatos: Observable<Contato[]>
    private termosDaBusca: Subject<string> = new Subject<string>()

    constructor(
        private contatoService: ContatoService,
        private router: Router
    ){}

    ngOnInit(): void { 
        this.contatos = this.termosDaBusca
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap(term => term ? this.contatoService.search(term) : Observable.of<Contato[]>([]))
                .catch(err =>{
                return Observable.of<Contato[]>([])
            })
    }

    ngOnChanges(changes: SimpleChanges): void {
        let busca: SimpleChange = changes['busca']
        this.search(busca.currentValue)

    }

    search(termo: string): void{
        this.termosDaBusca.next(termo)
        this.buscaChange.emit(termo)
    }

    verDetalhe(contato: Contato): void {
        let link = ['contato/save', contato.id]
        this.router.navigate(link)
        this.buscaChange.emit('')
    }

}