"use strict";
class InMemoryDataService {
    createDb() {
        let contato = [
            { id: 1, nome: "Jean Flores", email: "jean@email.com", telefone: "(00) 00000-0000" }
        ];
        return { contato };
    }
}
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map