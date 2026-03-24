import { Request, Response, NextFunction } from 'express';

// Definição dos middlewares
export function validateLeadRequiredFields(req: Request, res: Response, next: NextFunction) {
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

export function validateLeadTypeFields(req: Request, res: Response, next: NextFunction) {
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

export function validateLeadFormatFields(req: Request, res: Response, next: NextFunction) {
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

// CommonJS (usadas pelos navegadores)

// module.exports = {
//     validateLeadRequiredFields,
//     validateLeadTypeFields,
//     validateLeadFormatFields
// }


// Exportação não default - Indica que o lado que irá importar DEVE usar o nome dado na exportação
// Usada quando se está exportando MUITAS (mais que uma) coisas do mesmo arquivo


