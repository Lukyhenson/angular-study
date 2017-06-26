import { InMemoryDbService } from 'angular-in-memory-web-api'

import { Contato } from './contatos/contato.model'

export class InMemoryDataService implements InMemoryDbService {

    createDb(): {} {
        let contato: Contato[] = [
            {id: 1, nome: "Jean Flores", email: "jean@email.com", telefone: "(00) 00000-0000"}
        ]

        return { contato }
        
    }
}