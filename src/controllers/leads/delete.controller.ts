import { Request, Response } from "express";
import leads from "../../database/leads.db";

export function deleteLeadController(req: Request, res: Response): void {
    // 1. Input
    const { id } = req.params;


    // 2. Processing
    const indexEncontrado = leads.findIndex((lead) => `${lead.id}` === id);

    if (indexEncontrado === -1) {
        res.status(404).json({
            success: false,
            message: "Lead não encontrado pelo ID informado"
        });
        return
    }

    const [leadExcluido] = leads.splice(indexEncontrado, 1);


    // 3. Output
    res.status(200).json({
        success: true,
        message: "Lead deletado com sucesso",
        result: leadExcluido
    });
    return
}