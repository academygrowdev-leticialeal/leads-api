import { Request, Response } from "express";
import leads from "../../database/leads.db";
import { ILead } from "../../types/lead.type";
import getAddressByCepService from "../../services/get-address-by-cep.service";

export async function createLeadController(req: Request, res: Response): Promise<void> {
    try {

        // 1 - Input
        const { nomeCompleto, email, telefone, cep } = req.body;

        // 2 - Processing
        // Regra 1: Não é possível ter emails duplicados
        if (leads.some((lead) => lead.email === email)) {
            res.status(409).json({
                success: false,
                message: "E-mail já registrado no sistema."
            })
            return
        }

        // Regra 2: Não é possível ter telefones duplicados
        if (leads.some((lead) => lead.telefone === telefone)) {
            res.status(409).json({
                success: false,
                message: "Telefone já registrado no sistema."
            })
            return
        }

        const endereco = await getAddressByCepService(cep);

        if (!endereco) {
            res.status(503).json({
                success: false,
                message: "Os dados de endereço não puderam ser encontrados. Tente novamente mais tarde"
            })
            return
        }

        const novoLead: ILead = {
            id: new Date().getTime(),
            nomeCompleto,
            email,
            telefone,
            endereco,
        }

        leads.unshift(novoLead);


        // 3 - Output
        res.status(201).json({
            success: true,
            message: "Lead registrado com sucesso",
            result: novoLead
        })
        return
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Um inesperado aconteceu. Entre em contato com o time de suporte."
        })
        return
    }
}

// Exportação default - Indica que algo estará sendo exposto para outras partes do sistema importar.
// O lado que importa pode escolher como quer chamar a coisa importada

// ORIENTAÇÕES de uso
// 1 - Quando existe apenas 1 coisa sendo exportada do arquivo
// 2 - Quando o nome desse módulo pode-se repetir dentro do sistema, e quando deve ser possível chamar de outra coisa que não o nome definido no arquivo de origem.
// 3 - Quando o projeto definine isso como um padrão a ser adotado