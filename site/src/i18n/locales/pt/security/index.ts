export default {
  "title": "Segurança — AnyModelBot",
  "description": "Para onde vão os dados do AnyModelBot, as proteções locais e os limites conhecidos: o que fica no seu dispositivo e o que precisa sair dele.",
  "h1": "Segurança",
  "lead": "A versão completa do diagrama de fluxo de dados da página inicial: o que fica no seu dispositivo, o que precisa sair, as proteções que você pode verificar no código e as promessas que não fazemos.",
  "stays": "Fica no seu dispositivo",
  "leaves": "Sai do seu dispositivo",
  "leavesItems": [
    "O que você envia ao modelo (incluindo o conteúdo da tela durante o uso do computador) passa pelo gateway do Modelflare até o provedor que você escolher.",
    "O Modelflare mantém logs das solicitações por um período de retenção (você pode escolher de 7 a 365 dias no seu perfil), conforme o documento “Retenção de dados”; quando uma solicitação falha de vez, ou quando uma rota falha antes de um fallback dar certo, o gateway guarda uma cópia da solicitação original (sem o cabeçalho Authorization) para diagnóstico e a exclui após 72 horas (mesmo documento).",
    "As mensagens no Slack, Telegram e Discord passam, por natureza, pelos servidores dessas plataformas.",
    "Se você conectar apps como Notion ou GitHub, ou adicionar um conector MCP personalizado, o que os bots leem e escrevem vai para esses serviços, e o que eles leem também entra nas solicitações aos modelos.",
    "Os apps de desktop instalados verificam se há atualizações no GitHub após a inicialização e a cada 6 horas, e por padrão baixam os arquivos de atualização em segundo plano. Você pode desativar os downloads automáticos em Configurações → Geral. As solicitações não contêm credenciais de conta nem conteúdo de conversas. A instalação exige que você clique em Reiniciar e atualizar, sem tarefas em execução."
  ],
  "guardsTitle": "Proteções no código",
  "limitsTitle": "Limites e promessas que não fazemos",
  "limits": [
    "Não há modelos offline ou locais; as solicitações de inferência sempre saem do seu dispositivo.",
    "O uso do computador funciona automaticamente por padrão (dá para mudar para pedir confirmação antes de ações que alteram a interface); o modo direto do macOS não foi verificado em máquinas reais.",
    "O comportamento de rede do app não foi auditado por terceiros, por isso não afirmamos “telemetria zero”.",
    "Plataformas que não sejam Linux não têm a camada bubblewrap; a força do sandbox varia conforme a plataforma."
  ],
  "report": "Encontrou uma vulnerabilidade? Envie um e-mail para {email}."
};
