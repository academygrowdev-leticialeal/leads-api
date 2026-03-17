import leads from "../../database/leads.db.js";

export default function deleteLeadController(req, res) {
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
}