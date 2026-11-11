export default {
  "eyebrow": "PREÇOS · PAGAMENTO POR USO",
  "h2mark": "Sem assinatura",
  "h2rest": ". Pague só pelo que usar.",
  "lead": "O AnyModelBot é grátis e de código aberto — sem assinatura, sem planos. O uso dos modelos é cobrado pelo Modelflare por token, e a tabela de preços é totalmente pública.",
  "source": "Preços de modelflare.dev/pricing, obtidos em {fetchedAt} (UTC+8), versão {pricingVersion}.",
  "stale": "Tabela de preços salva em {snapshotDate} (não foi possível atualizar; a referência é modelflare.dev/pricing).",
  "cards": {
    "app": {
      "tag": "AnyModelBot",
      "price": "$0",
      "unit": "/ para sempre",
      "note": "Grátis e de código aberto (MIT)",
      "points": [
        "Desktop, Docker e CLI são todos grátis",
        "Sem assinatura, sem níveis de plano",
        "Crie quantos bots quiser, cada um definido por você",
        "Novas contas Modelflare ganham $1 em créditos de Bot, válidos só no AnyModelBot"
      ]
    },
    "usage": {
      "tag": "Uso dos modelos · cobrado pelo Modelflare",
      "unit": "/ 1M tokens de entrada",
      "note": "ex.: {model}, rota padrão, saída a {output} por 1M tokens; oficial {officialIn} / {officialOut}",
      "points": [
        "Preço por token, com entrada e saída cobradas separadamente",
        "Tabela de preços pública",
        "Troque de modelo quando quiser; o preço acompanha o modelo",
        "As assinaturas do Modelflare adicionam créditos de Bot equivalentes a 10% do plano"
      ],
      "cta": "Ver a tabela de preços completa ↗"
    },
    "month": {
      "tag": "Uso mensal estimado",
      "unit": "/ mês",
      "note": "Exemplo: 50 mensagens/dia, 3.000 tokens de entrada + 600 de saída cada, {model}.",
      "points": [
        "Coloque o seu próprio uso na calculadora abaixo",
        "A estimativa não inclui descontos de cache nem multiplicadores especiais de solicitação",
        "A fatura do Modelflare é a referência oficial"
      ],
      "cta": "Abrir a calculadora"
    }
  },
  "contrast": {
    "caption": "Pagamento por uso comparado com planos de assinatura",
    "head": [
      "",
      "Pagamento por uso (AnyModelBot + Modelflare)",
      "Planos de assinatura (abordagem comum)"
    ],
    "rows": [
      [
        "Como é cobrado",
        "Você paga pelo que usar, sem assinatura",
        "Você paga uma assinatura; o plano define quanto você pode usar"
      ],
      [
        "Parte não usada",
        "Sem gasto fixo",
        "A franquia do mês geralmente não é acumulada"
      ],
      [
        "Troca de modelos",
        "A qualquer momento; o preço acompanha o modelo",
        "Os modelos disponíveis geralmente dependem do plano"
      ],
      [
        "Como os preços são apresentados",
        "Preços por 1M tokens, publicados abertamente",
        "Muitas vezes expressos como múltiplos relativos de uma franquia"
      ]
    ],
    "note": "“Planos de assinatura” descreve a abordagem comum de produtos cobrados por assinatura, não um produto específico nem seus preços reais."
  },
  "table": {
    "more": "Ver preços de todos os {textCount} modelos de texto →",
    "caption": "Preços dos modelos de texto do Modelflare (rota padrão, USD por 1M tokens)",
    "col": {
      "model": "Modelo",
      "route": "Rota padrão",
      "input": "Entrada / 1M",
      "output": "Saída / 1M",
      "official": "Oficial (entrada / saída)",
      "vs": "vs. oficial"
    },
    "default": "Padrão",
    "context": "contexto de {n}",
    "showAll": "Mostrar todos os {textCount} modelos de texto",
    "showFeatured": "Só os destaques",
    "search": "Pesquisar modelos",
    "allVendors": "Todos os fornecedores",
    "media": "Os modelos de imagem e vídeo ({mediaCount}) estão em modelflare.dev/pricing ↗",
    "expand": "Mostrar todas as rotas de {model}",
    "detail": {
      "route": "Rota",
      "positioning": "Posicionamento",
      "vs": "vs. oficial",
      "price": "Entrada / saída"
    },
    "positioning": {
      "stable": "Rota de alta estabilidade",
      "award": "Rota com prioridade de preço",
      "campaign": "Rota por tempo limitado",
      "enterprise": "Rota de alta estabilidade (somente produção empresarial autorizada)",
      "other": "Outra rota"
    },
    "unlock": "Liberada com uma única recarga de US${amount} (por tempo limitado; valem as regras do Modelflare)",
    "tiers": "Solicitações individuais acima de {n} tokens usam a faixa de contexto longo: entrada {input} · saída {output}",
    "none": "Nenhum modelo encontrado.",
    "note": "Preços em USD por 1M tokens na rota padrão; sua conta pode ter acessos ou descontos diferentes (como indica a página do Modelflare). Dados de modelflare.dev/pricing, obtidos em {fetchedAt} (UTC+8), versão {pricingVersion}."
  },
  "calc": {
    "title": "Estime seu custo mensal",
    "model": "Modelo",
    "search": "Digite para pesquisar modelos",
    "none": "Nenhum modelo encontrado.",
    "route": "Rota",
    "routeDefault": "Rota padrão",
    "routeAward": "Prioridade de preço (award)",
    "routeAwardNote": "indicada para desenvolvimento e testes que podem ser repetidos",
    "msgs": "Mensagens por dia",
    "inTok": "Tokens de entrada por mensagem",
    "inTokNote": "Inclui o histórico da conversa e os resultados de ferramentas",
    "outTok": "Tokens de saída por mensagem",
    "days": "Estimativa para 30 dias",
    "presets": {
      "light": "Leve",
      "everyday": "Normal",
      "heavy": "Intenso (agente)"
    },
    "hint": "Uma mensagem = todas as chamadas ao modelo por trás de uma resposta do bot; uma tarefa de agente pode envolver várias chamadas.",
    "result": "≈ {amount} / mês",
    "split": "entrada {input} · saída {output}",
    "perMsg": "cerca de {amount} por mensagem",
    "official": "cerca de {amount} a preços oficiais",
    "disclaimer": "Apenas uma estimativa. Não inclui descontos de cache nem multiplicadores por solicitação (por exemplo, o nível de serviço prioritário); solicitações acima do limite de faixa de um modelo são cobradas na faixa mais alta (já incluído); a fatura do Modelflare é a referência oficial.",
    "copy": "Copiar estimativa",
    "copyText": "Estimativa de uso do AnyModelBot: {model} ({route}), {msgs} mensagens/dia, {inTok} tokens de entrada + {outTok} de saída cada — cerca de {amount}/mês (30 dias, preços obtidos em {fetchedAt})",
    "full": "Ver os preços completos deste modelo ↗",
    "expandBar": "Detalhes"
  },
  "banner": {
    "text": "Já tem uma conta Modelflare? Entre uma vez no app e pronto — o uso é cobrado conforme a tabela de preços.",
    "cta": "Abrir o Modelflare ↗"
  },
  "pageTitle": "Preços do AnyModelBot — pagamento por uso, tabela de preços pública",
  "pageDescription": "O AnyModelBot é grátis e de código aberto, sem assinatura. O uso dos modelos é cobrado por token pelo Modelflare: veja a tabela de preços pública e uma calculadora de custo mensal."
};
