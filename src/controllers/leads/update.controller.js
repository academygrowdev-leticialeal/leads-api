import leads from "../../database/leads.db.js";
import getAddressByCep from "../../services/get-address-by-cep.service.js";


export default async function updateLeadController(req, res) {
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
        const endereco = await getAddressByCep(cep);

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
}