import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise'

import { Contato } from './contato.model'
import { ServiceInterface } from './../interfaces/service.interface'

@Injectable()
export class ContatoService implements ServiceInterface<Contato> {

    private apiUrl: string = 'app/contato'
    private headers: Headers = new Headers({'Content-Type': 'application/json'})

    constructor(
        private http: Http
    ){}

    findAll(): Promise<Contato[]> {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handlerError)
    }

    create(contato: Contato): Promise<Contato> {
        return this.http
            .post(this.apiUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response) => response.json().data as Contato)
            .catch(this.handlerError)
    }

    update(contato: Contato): Promise<Contato> {
        const url = `${this.apiUrl}/${contato.id}` // app/contato/:id
        return this.http
            .post(url, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handlerError)
    }

    delete(contato: Contato): Promise<Contato> {
        const url = `${this.apiUrl}/${contato.id}` // app/contato/:id
        return this.http
            .post(url, {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handlerError)
    }

    find(id: number): Promise<Contato> {
        return this.findAll()
            .then((contatos: Contato[]) => {
                return contatos.find((contato) => contato.id === id)
            })
    }

    private handlerError(err: any): Promise<any> {
        console.log('Error:', err);
        return Promise.reject(err.message || err)
    }
    
    search(term: string): Observable<Contato[]>{
        return this.http
            .get(`${this.apiUrl}/?nome=${term}`)
            .map((res: Response) => res.json().data as Contato[])
    }

}