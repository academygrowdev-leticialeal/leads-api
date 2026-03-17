import leads from "../../database/leads.db.js";


export default function listAllLeadsController(req, res) {
    // 1. Input


    // 2. Processing


    // 3. Ouput
    return res.status(200).json({
        success: true,
        message: "Leads listados com sucesso",
        result: leads
    })
}