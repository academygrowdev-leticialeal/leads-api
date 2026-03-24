import { Request, Response } from "express";
import leads from "../../database/leads.db";


export function listAllLeadsController(req: Request, res: Response): void {
    // 1. Input


    // 2. Processing


    // 3. Ouput
    res.status(200).json({
        success: true,
        message: "Leads listados com sucesso",
        result: leads
    })
    return
}