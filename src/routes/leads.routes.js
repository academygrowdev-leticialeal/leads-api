import express from 'express';
import { validateLeadFormatFields, validateLeadRequiredFields, validateLeadTypeFields } from '../middlewares/validate-fields-lead.middleware.js';
import { create, deleteLead, getById, listAll, update } from '../controllers/leads/index.js';

const routerLeads = express.Router(); // Sem definições de rotas

// Aqui são definidas ios verbos, rotas e o que é executado em cada uma delas
routerLeads.post("/leads", [validateLeadRequiredFields, validateLeadTypeFields, validateLeadFormatFields], create);
routerLeads.get("/leads", listAll);
routerLeads.get("/leads/:id", getById);
routerLeads.put("/leads/:id", [validateLeadTypeFields, validateLeadFormatFields], update);
routerLeads.delete("/leads/:id", deleteLead);

export default routerLeads;