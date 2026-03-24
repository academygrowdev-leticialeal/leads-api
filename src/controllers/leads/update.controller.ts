import { Request, Response } from "express";
import leads from "../../database/leads.db";
import { ILead } from "../../types/lead.type";
import getAddressByCepService from "../../services/get-address-by-cep.service";


export async function updateLeadController(req: Request, res: Response): Promise<void> {
    // 1. Input
    const { id } = req.params;
    const { nomeCompleto, email, telefone, cep } = req.body || {};


    // 2. Processing
    const indexEncontrado = leads.findIndex((lead) => `${lead.id}` === id);

    // garante que é um indice válido
    if (indexEncontrado === -1) {
        res.status(404).json({
            success: false,
            message: "Lead não encontrado pelo ID informado"
        });
        return
    }

    if (typeof leads[indexEncontrado] === 'undefined') {
        res.status(404).json({
            success: false,
            message: "Lead não encontrado pelo ID informado"
        });
        return
    }

    // Implicito? TS apartir da inferencia faz a tipagem da variavel
    const registroAtual = { ...leads[indexEncontrado] };

    // Explicita? O dev que determina o tipo na declaração da variavel ou função
    let lead: ILead = {
        id: registroAtual.id,
        nomeCompleto: nomeCompleto || registroAtual.nomeCompleto,
        email: email || registroAtual.email,
        telefone: telefone || registroAtual.telefone,
        endereco: { ...registroAtual.endereco }
    };

    if (cep) {
        const endereco = await getAddressByCepService(cep);

        if (!endereco) {
            res.status(503).json({
                success: false,
                message: "Os dados de endereço não puderam ser encontrados. Tente novamente mais tarde"
            })
            return
        }

        lead.endereco = { ...endereco }
    }

    leads.splice(indexEncontrado, 1, lead);


    // 3. Output
    res.status(200).json({
        success: true,
        message: "Lead atualizado com sucesso",
        result: lead
    });
    return
}