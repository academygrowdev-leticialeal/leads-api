import express, { Router } from 'express';
import {
    validateLeadFormatFields,
    validateLeadRequiredFields,
    validateLeadTypeFields
} from '../middlewares/validate-fields-lead.middleware';
import {
    createLeadController as create,
    listAllLeadsController as listAll,
    getByIdLeadController as getById,
    updateLeadController as update,
    deleteLeadController as deleteLead
} from '../controllers/leads';

const routerLeads: Router = express.Router(); // Sem definições de rotas

// Aqui são definidas ios verbos, rotas e o que é executado em cada uma delas
routerLeads.post("/leads", [validateLeadRequiredFields, validateLeadTypeFields, validateLeadFormatFields], create);
routerLeads.get("/leads", listAll);
routerLeads.get("/leads/:id", getById);
routerLeads.put("/leads/:id", [validateLeadTypeFields, validateLeadFormatFields], update);
routerLeads.delete("/leads/:id", deleteLead);

export default routerLeads;