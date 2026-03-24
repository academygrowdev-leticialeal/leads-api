import axios from 'axios';
import { Endereco } from '../types/lead.type';
// const axios = require('axios').default

export default async function getAddressByCepService(cep: string): Promise<Endereco | null> {
    try {
        // Precisamos consultar o CEP em uma API para descobrir os demais dados de endereço
        // URL GET https://viacep.com.br/ws/{{cep}}/json
        // Promise - Tipo de dado que possui 3 estados possiveis
        // Pending (pendente) - a instrução foi interpretada e executada porém não se sabe o resultado
        // Fulfiled (concluida) - resultado da executação sem falhas de uma promise 
        // Reject (rejeitada) - durante o processo de execução da promise, foi lançada uma Exception/Erro
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json`);

        if (resposta.data?.erro) {
            throw new Error('Não foi possível encontrar o endereço pelo CEP informado')
        }

        return {
            cep: cep,
            rua: resposta.data.logradouro,
            bairro: resposta.data.bairro,
            cidade: resposta.data.localidade,
            uf: resposta.data.uf
        }
    } catch (error) {
        console.error(error);
        return null
    }
}
