// Type Alias
// CamelCase

// Unions, Intersections
// Utilitários
// Generics

// type TemperaturaLead = 'FRIO' | 'MORNO' | 'QUENTE';


// type Lead = {
//     id: number;
//     nomeCompleto: string;
//     email: string;
//     telefone: string;
//     temperatura: TemperaturaLead;
//     endereco: Endereco;
// }

// type Endereco = {
//     cep: string;
//     rua: string;
//     bairro: string;
//     cidade: string;
//     uf: string;
// }

// type EndereDadosComplementares = {
//     complemento?: string;
//     numero: string;
// }

// type EndereCompleto = Omit<Partial<Endereco & EndereDadosComplementares>, 'cep' | 'complemento'>;


// const enderecoCompleto: EndereCompleto = {

// }


// Interfaces - é possível criar outras interfaces usando interfaces bases (extends)
export interface ILead {
    id: number;
    nomeCompleto: string;
    email: string;
    telefone: string;
    endereco: Endereco;
}

export interface Endereco {
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    uf: string;
}