
// CONSTRUÇÃO E CONFIGURAÇÃO BÁSICA DO SERVIDOR EXPRESS
const { isAxiosError } = require('axios');
const express = require('express') // termo para importar recursos que estão fora deste arquivo
const axios = require('axios').default
const app = express() // constroi da API express
const port = 3000 // onde estara rodando a nossa API
app.use(express.json()); // essa linha configura nossa api à utilizar JSON como padrão de comunicação



// Banco de dados em memória volátil
const leads = [];


// DEFINIÇÕES DE RECURSOS E SUAS OPERAÇÕES DEFINIDAS
//DEFINIR AS ROTAS DA APLICAÇÃO E SUAS INTENÇÕES
app.get("/", (req, res) => {
    res.json({ result: 'Hello World!' });
})


// Cadastrar Lead
app.post("/leads", [validateLeadRequiredFields, validateLeadTypeFields, validateLeadFormatFields], async (req, res) => {
    try {

        // 1 - Input
        const { nomeCompleto, email, telefone, cep } = req.body;

        // 2 - Processing
        // Regra 1: Não é possível ter emails duplicados
        if (leads.some((lead) => lead.email === email)) {
            return res.status(409).json({
                success: false,
                message: "E-mail já registrado no sistema."
            })
        }

        // Regra 2: Não é possível ter telefones duplicados
        if (leads.some((lead) => lead.telefone === telefone)) {
            return res.status(409).json({
                success: false,
                message: "Telefone já registrado no sistema."
            })
        }

        const endereco = await buscaEndereco(cep);

        if (!endereco) {
            return res.status(503).json({
                success: false,
                message: "Os dados de endereço não puderam ser encontrados. Tente novamente mais tarde"
            })
        }

        const novoLead = {
            id: new Date().getTime(),
            nomeCompleto,
            email,
            telefone,
            endereco,
        }

        leads.unshift(novoLead);


        // 3 - Output
        return res.status(201).json({
            success: true,
            message: "Lead registrado com sucesso",
            result: novoLead
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Um inesperado aconteceu. Entre em contato com o time de suporte."
        })
    }
});


// Listar Leads
app.get("/leads", (req, res) => {
    // 1. Input


    // 2. Processing


    // 3. Ouput
    return res.status(200).json({
        success: true,
        message: "Leads listados com sucesso",
        result: leads
    })
})


// Buscar um Lead por identificador
app.get("/leads/:id", (req, res) => {
    // 1. Input
    const { id } = req.params;


    // 2. Processing
    const leadEncontrado = leads.find((lead) => `${lead.id}` === id);

    if (!leadEncontrado) {
        return res.status(404).json({
            success: false,
            message: "Lead não encontrado pelo ID informado"
        });
    }


    // 3. Output
    return res.status(200).json({
        success: true,
        message: "Lead encontrado com sucesso",
        result: leadEncontrado
    });

})


// Atualizar o registro de um Lead
app.put("/leads/:id", [validateLeadTypeFields, validateLeadFormatFields], async (req, res) => {
    // 1. Input
    const { id } = req.params;
    const { nomeCompleto, email, telefone, cep } = req.body || {};


    // 2. Processing
    const indexEncontrado = leads.findIndex((lead) => `${lead.id}` === id);

    if (indexEncontrado === -1) {
        return res.status(404).json({
            success: false,
            message: "Lead não encontrado pelo ID informado"
        });
    }

    const registroAtual = { ...leads[indexEncontrado] };

    let lead = {
        id: registroAtual.id,
        nomeCompleto: nomeCompleto || registroAtual.nomeCompleto,
        email: email || registroAtual.email,
        telefone: telefone || registroAtual.telefone,
        endereco: { ...registroAtual.endereco }
    };

    if (cep) {
        const endereco = await buscaEndereco(cep);

        if (!endereco) {
            return res.status(503).json({
                success: false,
                message: "Os dados de endereço não puderam ser encontrados. Tente novamente mais tarde"
            })
        }

        lead.endereco = { ...endereco }
    }

    leads.splice(indexEncontrado, 1, lead);


    // 3. Output
    return res.status(200).json({
        success: true,
        message: "Lead atualizado com sucesso",
        result: lead
    });
})


// Excluir um registro de Lead
app.delete("/leads/:id", () => {
    // 1. Input
    const { id } = req.params;


    // 2. Processing
    const indexEncontrado = leads.findIndex((lead) => `${lead.id}` === id);

    if (indexEncontrado === -1) {
        return res.status(404).json({
            success: false,
            message: "Lead não encontrado pelo ID informado"
        });
    }

    const [leadExcluido] = leads.splice(indexEncontrado, 1);


    // 3. Output
    return res.status(200).json({
        success: true,
        message: "Lead deletado com sucesso",
        result: leadExcluido
    });
})


// Definição dos middlewares
function validateLeadRequiredFields(req, res, next) {
    const { nomeCompleto, email, telefone, cep } = req.body || {};

    const errors = [];

    if (!nomeCompleto) errors.push({ field: "nomeCompleto", error: "O campo é obrigatório" });
    if (!email) errors.push({ field: "email", error: "O campo é obrigatório" });
    if (!telefone) errors.push({ field: "telefone", error: "O campo é obrigatório" });
    if (!cep) errors.push({ field: "cep", error: "O campo é obrigatório" });

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Requisição inválida",
            reason: errors
        });
    }

    return next();
}

function validateLeadTypeFields(req, res, next) {
    const { nomeCompleto, email, telefone, cep } = req.body || {};

    const errors = [];

    if (nomeCompleto && typeof nomeCompleto !== 'string') {
        errors.push({ field: "nomeCompleto", error: "O campo precisa ser um texto" });
    }

    if (email && typeof email !== 'string') {
        errors.push({ field: "email", error: "O campo precisa ser um texto" });
    }

    if (telefone && typeof telefone !== 'string') {
        errors.push({ field: "telefone", error: "O campo precisa ser um texto" });
    }

    if (cep && typeof cep !== 'string') {
        errors.push({ field: "cep", error: "O campo precisa ser um texto" });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Requisição inválida",
            reason: errors
        });
    }

    return next();
}

function validateLeadFormatFields(req, res, next) {
    const { nomeCompleto, email, telefone, cep } = req.body || {};

    // 2 - Processing
    // 2.1 - Validação dos dados recebidos (a existencia e o formato)
    const errors = [];

    // Validar o formato - validar o formato do valor
    if ((nomeCompleto && typeof nomeCompleto === 'string') && nomeCompleto.length < 3) {
        errors.push({ field: "nomeCompleto", error: "O campo precisa ter no mínimo 3 caracteres" });
    }

    if ((email && typeof email === 'string') && !email.includes('@')) {
        errors.push({ field: "email", error: "O campo precisa ser um e-mail" });
    }

    const regexPhone = /^[1-9][0-9](9[1-9][0-9]{3}|[2-9][0-9]{3})[0-9]{4}$/;
    const regexCep = /^[0-9]{8}$/;

    if ((telefone && typeof telefone === 'string') && !regexPhone.test(telefone)) {
        errors.push({ field: "telefone", error: "O campo precisa ser um telefone no formato 51999887766" });
    }

    if ((cep && typeof cep === 'string') && !regexCep.test(cep)) {
        errors.push({ field: "cep", error: "O campo precisa ser um CEP no formato 94130400" });
    }


    if (errors.length > 0) {
        // O cliente requisitou o cadastro com os dados inválidos
        return res.status(400).json({
            success: false,
            message: "Requisição inválida",
            reason: errors
        });
    }

    return next()
}

async function buscaEndereco(cep) {
    try {
        // Precisamos consultar o CEP em uma API para descobrir os demais dados de endereço
        // URL GET https://viacep.com.br/ws/{{cep}}/json
        // Promise - Tipo de dado que possui 3 estados possiveis
        // Pending (pendente) - a instrução foi interpretada e executada porém não se sabe o resultado
        // Fulfiled (concluida) - resultado da executação sem falhas de uma promise 
        // Reject (rejeitada) - durante o processo de execução da promise, foi lançada uma Exception/Erro
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json`);

        if (resposta.data?.erro) return

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


// ENTRYPOINT
// AQUI é o que faz a API estar no ar!
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})


