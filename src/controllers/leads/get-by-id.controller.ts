import { Request, Response } from "express";
import leads from "../../database/leads.db";

export function getByIdLeadController(req: Request, res: Response): void {
    // 1. Input
    const { id } = req.params;


    // 2. Processing
    const leadEncontrado = leads.find((lead) => `${lead.id}` === id);

    if (!leadEncontrado) {
        res.status(404).json({
            success: false,
            message: "Lead não encontrado pelo ID informado"
        });
        return
    }


    // 3. Output
    res.status(200).json({
        success: true,
        message: "Lead encontrado com sucesso",
        result: leadEncontrado
    });
    return
}