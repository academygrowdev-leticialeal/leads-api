import leads from "../../database/leads.db.js";

export default function getByIdLeadController(req, res) {
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
}