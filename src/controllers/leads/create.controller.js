import leads from '../../database/leads.db.js';
import getAddressByCep from '../../services/get-address-by-cep.service.js';

export default async function createLeadController(req, res) {
    try {

        // 1 - Input
        const { nomeCompleto, email, telefone, cep } = req.body;

        // 2 - Processing
        // Regra 1: Não é possível ter emails duplicados
        if (leads.some((lead) => lead.email === email)) {
            return res.status(409).json({
                success: false,
                message: "E-mail já registrado no sistema."
            })
        }

        // Regra 2: Não é possível ter telefones duplicados
        if (leads.some((lead) => lead.telefone === telefone)) {
            return res.status(409).json({
                success: false,
                message: "Telefone já registrado no sistema."
            })
        }

        const endereco = await getAddressByCep(cep);

        if (!endereco) {
            return res.status(503).json({
                success: false,
                message: "Os dados de endereço não puderam ser encontrados. Tente novamente mais tarde"
            })
        }

        const novoLead = {
            id: new Date().getTime(),
            nomeCompleto,
            email,
            telefone,
            endereco,
        }

        leads.unshift(novoLead);


        // 3 - Output
        return res.status(201).json({
            success: true,
            message: "Lead registrado com sucesso",
            result: novoLead
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Um inesperado aconteceu. Entre em contato com o time de suporte."
        })
    }
}

// Exportação default - Indica que algo estará sendo exposto para outras partes do sistema importar.
// O lado que importa pode escolher como quer chamar a coisa importada

// ORIENTAÇÕES de uso
// 1 - Quando existe apenas 1 coisa sendo exportada do arquivo
// 2 - Quando o nome desse módulo pode-se repetir dentro do sistema, e quando deve ser possível chamar de outra coisa que não o nome definido no arquivo de origem.
// 3 - Quando o projeto definine isso como um padrão a ser adotado