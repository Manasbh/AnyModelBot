// group · pt: conversas em grupo (screens/group.js)
export default {
  /** Item da lista de @ que significa todos os membros; também é o que vai para a caixa de mensagem. Fica em inglês: src/core/groups.ts só reconhece "everyone"/"all" */
  everyone: "everyone",
  placeholder: "Envie uma mensagem; use @ para escolher quem responde",
  mentionLabel: "Escolha um membro para mencionar com @",
  editTitle: "Nome e membros do grupo",
  empty: "Quem você mencionar com @ responde. Sem @, o último bot que respondeu continua. Cada bot usa seu próprio modelo, espaço de trabalho e memória.",
  /** Nome mostrado nas respostas deixadas por um bot que foi excluído */
  removedBot: "Bot excluído",
  working: "{name} está respondendo…",
  noMessages: "Nenhuma mensagem ainda",
  sheet: {
    newTitle: "Nova conversa em grupo",
    editTitle: "Nome e membros do grupo",
    name: "Nome",
    namePlaceholder: "Deixe em branco para usar os nomes dos membros",
    members: "Membros",
    membersHint: "Escolha pelo menos dois bots",
    create: "Criar",
    save: "Salvar",
  },
  delete: {
    title: "Excluir “{name}”?",
    body: "Isso exclui permanentemente a conversa em grupo e as mensagens dela. Os bots e as conversas individuais com eles não são afetados.",
    confirm: "Excluir permanentemente",
  },
};
