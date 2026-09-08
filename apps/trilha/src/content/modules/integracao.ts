import type { Module } from "../types";

/** Fase 3 — dias 61 a 90. Deixar de estudar e passar a entregar. */
export const integracaoModules: Module[] = [
  {
    id: "ler-codigo",
    order: 450,
    trackId: "core",
    phaseId: "integracao",
    title: "Ler o código de outra pessoa",
    summary: "A habilidade que ninguém ensina e que você vai usar mais do que escrever.",
    goal: "Navegar por um repositório desconhecido e explicar o caminho de uma funcionalidade ponta a ponta.",
    whyHere:
      "Você vai passar mais tempo lendo código do time do que escrevendo do zero. Quem lê rápido entrega rápido.",
    estimatedHours: 8,
    resources: [
      {
        label: "Como ler código-fonte",
        url: "https://spin.atomicobject.com/how-to-read-code/",
        kind: "artigo",
        source: "Atomic Object",
        minutes: 30,
      },
      {
        label: "Busca de código no GitHub",
        url: "https://docs.github.com/pt/search-github/github-code-search/understanding-github-code-search-syntax",
        kind: "doc",
        source: "GitHub",
        minutes: 30,
      },
    ],
    exercise: {
      title: "Rastreie uma funcionalidade ponta a ponta",
      description:
        "Escolha uma funcionalidade existente e siga o caminho completo, do clique do usuário até o banco e de volta.",
      steps: [
        "Comece pela interface: qual componente responde ao clique?",
        "Siga até a chamada de API e encontre a rota no back-end.",
        "Vá até a consulta no banco.",
        "Desenhe o caminho num diagrama e valide com quem escreveu.",
      ],
    },
    doneWhen: [
      "Você explica o caminho completo sem abrir o código.",
      "Você encontrou pelo menos uma coisa que faria diferente — e sabe justificar.",
      "O diagrama foi validado por quem construiu a funcionalidade.",
    ],
    prerequisites: [],
  },
  {
    id: "projeto-final",
    order: 460,
    trackId: "core",
    phaseId: "integracao",
    title: "Projeto final: uma feature de verdade",
    summary: "Do requisito ao ar. Banco, API, interface e esteira — tudo seu.",
    goal: "Entregar uma funcionalidade completa em um projeto real da CLG, do requisito até a produção.",
    whyHere:
      "Este é o módulo que a trilha inteira prepara. Tudo antes dele foi ensaio; aqui o resultado é usado por alguém de verdade.",
    estimatedHours: 60,
    resources: [
      {
        label: "Especificação da feature do projeto final",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
      {
        label: "Repositório onde a feature será construída",
        url: "",
        kind: "ferramenta",
        internal: true,
        source: "CLG",
      },
      {
        label: "Padrões de código e arquitetura da CLG",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
    ],
    exercise: {
      title: "Entregue de ponta a ponta",
      description:
        "O mentor entrega o requisito, não a solução. A modelagem, o desenho da API e a interface são decisões suas — defendidas na revisão.",
      steps: [
        "Escreva o que entendeu do requisito e valide antes de codar.",
        "Modele o banco e escreva a migration.",
        "Implemente a API com validação e testes.",
        "Construa a interface usando o design system, com os quatro estados.",
        "Abra a PR, aplique a revisão e publique pela esteira.",
      ],
    },
    doneWhen: [
      "A feature está em produção e sendo usada.",
      "A esteira passou sem intervenção manual.",
      "A PR foi aprovada por pelo menos duas pessoas do time.",
      "Você documentou como usar e como reverter.",
    ],
    prerequisites: ["ler-codigo"],
  },
  {
    id: "testes-qualidade",
    order: 470,
    trackId: "core",
    phaseId: "integracao",
    title: "Testes e qualidade na prática",
    summary: "O que testar, o que não testar, e por que 100% de cobertura é uma métrica ruim.",
    goal: "Escolher o que merece teste automatizado e escrever testes que continuam válidos após refatoração.",
    whyHere:
      "Teste ruim é pior que teste nenhum: quebra a cada mudança, ninguém confia, e alguém acaba desligando a verificação.",
    estimatedHours: 10,
    resources: [
      {
        label: "Testing Library — princípios",
        url: "https://testing-library.com/docs/guiding-principles/",
        kind: "doc",
        source: "Testing Library",
        minutes: 30,
      },
      {
        label: "Escreva testes. Não muitos. Principalmente de integração.",
        url: "https://kentcdodds.com/blog/write-tests",
        kind: "artigo",
        source: "Kent C. Dodds",
        minutes: 20,
      },
      {
        label: "Vitest — guia",
        url: "https://vitest.dev/guide/",
        kind: "doc",
        source: "Vitest",
        minutes: 90,
      },
    ],
    exercise: {
      title: "Teste comportamento, não implementação",
      description:
        "Escreva testes para a sua feature e depois refatore o código por dentro. Os testes devem continuar verdes.",
      steps: [
        "Escreva os testes descrevendo o que o usuário consegue fazer.",
        "Refatore a implementação sem mudar o comportamento.",
        "Se algum teste quebrou, ele testava implementação — reescreva.",
        "Adicione um teste para cada bug encontrado na revisão.",
      ],
    },
    doneWhen: [
      "Os testes sobreviveram a uma refatoração interna.",
      "Cada bug encontrado virou um teste.",
      "Você sabe justificar o que decidiu não testar.",
    ],
    prerequisites: ["projeto-final"],
  },
  {
    id: "code-review",
    order: 480,
    trackId: "core",
    phaseId: "integracao",
    title: "Code review: dar e receber",
    summary: "Revisar é ensinar. Ser revisado é aprender, não ser julgado.",
    goal: "Revisar a PR de outra pessoa com comentários úteis e receber revisão sem levar para o pessoal.",
    whyHere:
      "Revisão é o principal canal de aprendizado num time pequeno. É onde o conhecimento circula sem virar reunião.",
    estimatedHours: 6,
    resources: [
      {
        label: "Guia de code review do Google",
        url: "https://google.github.io/eng-practices/review/",
        kind: "artigo",
        source: "Google",
        minutes: 90,
      },
      {
        label: "Como comentar em uma Pull Request",
        url: "https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests",
        kind: "doc",
        source: "GitHub",
        minutes: 30,
      },
    ],
    exercise: {
      title: "Revise três PRs de verdade",
      description:
        "Revise PRs abertas pelo time. Comentário sem sugestão não conta como revisão.",
      steps: [
        "Entenda o objetivo da PR antes de olhar o código.",
        "Comente perguntando, não afirmando: 'o que acontece se vier nulo aqui?'.",
        "Separe o que bloqueia o merge do que é preferência sua.",
        "Aprove quando estiver bom — segurar PR sem motivo trava o time.",
      ],
    },
    doneWhen: [
      "Você revisou três PRs com comentários que geraram mudança.",
      "Você distingue bloqueio de sugestão nos seus comentários.",
      "Você respondeu a uma revisão discordando, com argumento técnico.",
    ],
    prerequisites: ["projeto-final"],
  },
  {
    id: "deploy-producao",
    order: 490,
    trackId: "core",
    phaseId: "integracao",
    title: "Levando ao ar",
    summary: "O momento em que o seu código passa a ser problema de todo mundo.",
    goal: "Publicar em produção pela esteira, verificar que está de pé e saber o que fazer se não estiver.",
    whyHere:
      "Publicar sem verificar depois é metade do trabalho. Quem publica é quem confere — e quem reverte, se precisar.",
    estimatedHours: 6,
    resources: [
      {
        label: "Checklist de deploy e plano de rollback da CLG",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
      {
        label: "Onde ficam os logs e o monitoramento da CLG",
        url: "",
        kind: "ferramenta",
        internal: true,
        source: "CLG",
      },
    ],
    exercise: {
      title: "Publique a sua feature",
      description:
        "Leve a sua própria feature ao ar, acompanhado pelo mentor, e verifique tudo depois.",
      steps: [
        "Rode o checklist antes de publicar.",
        "Publique pela esteira, sem passo manual.",
        "Verifique em produção: a funcionalidade, os logs e os erros.",
        "Avise o time no canal, dizendo o que mudou.",
      ],
    },
    doneWhen: [
      "A feature está em produção e você confirmou funcionando.",
      "Você olhou os logs depois de publicar.",
      "Você sabe exatamente como reverter, se precisar.",
    ],
    prerequisites: ["testes-qualidade", "code-review"],
  },
  {
    id: "retrospectiva",
    order: 500,
    trackId: "core",
    phaseId: "integracao",
    title: "Retrospectiva dos 90 dias",
    summary: "O que ficou sólido, o que ficou raso e para onde ir agora.",
    goal: "Avaliar honestamente o próprio progresso e definir os próximos três meses com o mentor.",
    whyHere:
      "A trilha termina; a formação não. Sair daqui sem um próximo passo definido é desperdiçar o impulso de 90 dias.",
    estimatedHours: 4,
    resources: [
      {
        label: "Roadmaps de front-end, back-end e DevOps",
        url: "https://roadmap.sh/",
        kind: "ferramenta",
        source: "roadmap.sh",
        minutes: 60,
      },
      {
        label: "Plano de desenvolvimento individual da CLG",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
    ],
    exercise: {
      title: "Escreva a sua retrospectiva",
      description:
        "Sem falsa modéstia e sem se punir. O objetivo é enxergar onde você está de verdade.",
      steps: [
        "Liste três coisas que você faz hoje e não fazia no dia 1.",
        "Liste três em que ainda depende de ajuda.",
        "Escolha uma trilha para aprofundar nos próximos 90 dias.",
        "Combine com o mentor os marcos desse próximo ciclo.",
      ],
    },
    doneWhen: [
      "A retrospectiva foi escrita e discutida com o mentor.",
      "Os próximos 90 dias têm objetivos definidos.",
      "Você sabe dizer qual é a sua maior lacuna hoje.",
    ],
    prerequisites: ["deploy-producao"],
  },
];
