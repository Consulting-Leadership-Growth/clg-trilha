import type { Module } from "../types";

/** Trilha de front-end: fundamentos próprios (dias 6–30) e especialização (31–60). */
export const frontModules: Module[] = [
  {
    id: "html-acessibilidade",
    order: 70,
    trackId: "front",
    phaseId: "fundamentos",
    title: "HTML semântico e acessibilidade",
    summary: "A tag certa resolve de graça o que um `div` cobra caro depois.",
    goal: "Estruturar uma página com HTML semântico e navegar por ela inteira usando só o teclado.",
    whyHere:
      "A gente entrega produto para cliente. Acessibilidade não é enfeite: é requisito contratual em boa parte dos projetos, e refazer depois custa dez vezes mais.",
    estimatedHours: 10,
    resources: [
      {
        label: "HTML: estruturando a web",
        url: "https://www.alura.com.br/cursos-online-front-end/html-css",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 600,
      },
      {
        label: "Learn HTML",
        url: "https://web.dev/learn/html",
        kind: "curso",
        source: "web.dev",
        minutes: 480,
      },
      {
        label: "Learn Accessibility",
        url: "https://web.dev/learn/accessibility",
        kind: "curso",
        source: "web.dev",
        minutes: 360,
      },
      {
        label: "Elementos HTML — referência completa",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Reference/Elements",
        kind: "doc",
        source: "MDN",
      },
    ],
    exercise: {
      title: "Reescreva uma página só com `div` em HTML semântico",
      description:
        "Peça ao mentor um trecho antigo de marcação. Reescreva usando os elementos corretos e valide a navegação por teclado.",
      steps: [
        "Troque `div` por `header`, `nav`, `main`, `section`, `article` e `footer` onde couber.",
        "Garanta que toda imagem tenha `alt` significativo — ou `alt=\"\"` se for decorativa.",
        "Associe todo `input` a um `label`.",
        "Percorra a página inteira só com Tab e confira se o foco está sempre visível.",
      ],
    },
    doneWhen: [
      "A página não tem `div` onde existe um elemento semântico melhor.",
      "Dá para usar a página inteira sem mouse, com foco visível em todo passo.",
      "Você sabe explicar quando `alt` deve ficar vazio.",
    ],
    prerequisites: ["como-a-web-funciona"],
  },
  {
    id: "css-moderno",
    order: 80,
    trackId: "front",
    phaseId: "fundamentos",
    title: "CSS moderno: box model, flex e grid",
    summary: "Entender o layout antes de usar utilitário — senão Tailwind vira chute.",
    goal: "Montar layouts responsivos com Flexbox e Grid, sem recorrer a gambiarra de posicionamento.",
    whyHere:
      "A CLG usa Tailwind, que é CSS com outro nome. Quem não sabe o que `flex-1` faz por baixo passa a tarde trocando classes até parecer certo.",
    estimatedHours: 12,
    resources: [
      {
        label: "CSS: cores, posicionamento e flexbox",
        url: "https://www.alura.com.br/cursos-online-front-end/css",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 600,
      },
      {
        label: "Learn CSS",
        url: "https://web.dev/learn/css",
        kind: "curso",
        source: "web.dev",
        minutes: 600,
      },
      {
        label: "A Complete Guide to Flexbox",
        url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
        kind: "artigo",
        source: "CSS-Tricks",
        minutes: 45,
      },
      {
        label: "A Complete Guide to Grid",
        url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
        kind: "artigo",
        source: "CSS-Tricks",
        minutes: 45,
      },
    ],
    exercise: {
      title: "Reproduza uma tela real do produto",
      description:
        "Escolha uma tela existente e reconstrua o layout em CSS puro, sem framework, olhando só para a imagem.",
      steps: [
        "Identifique quais blocos são Flex e quais são Grid antes de escrever código.",
        "Monte a versão desktop primeiro.",
        "Adapte para 375px de largura sem scroll horizontal.",
        "Compare com o original e liste as diferenças que sobraram.",
      ],
    },
    doneWhen: [
      "O layout não usa `position: absolute` para resolver alinhamento comum.",
      "Não existe rolagem horizontal em nenhuma largura entre 320px e 1920px.",
      "Você explica a diferença entre `justify-content` e `align-items` sem hesitar.",
    ],
    prerequisites: ["html-acessibilidade"],
  },
  {
    id: "react-componentes",
    order: 170,
    trackId: "front",
    phaseId: "especializacao",
    title: "React: componentes e props",
    summary: "Quebrar uma tela em partes que se reaproveitam.",
    goal: "Construir uma interface a partir de componentes pequenos, tipados e sem lógica duplicada.",
    whyHere:
      "Todo front da CLG é React. Componente mal dividido é a origem da maior parte da dívida técnica que a gente carrega depois.",
    estimatedHours: 12,
    resources: [
      {
        label: "Aprenda React — tutorial oficial",
        url: "https://react.dev/learn",
        kind: "doc",
        source: "react.dev",
        minutes: 480,
      },
      {
        label: "Formação React",
        url: "https://www.alura.com.br/formacao-react",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 1800,
      },
      {
        label: "Pensando em React",
        url: "https://pt-br.react.dev/learn/thinking-in-react",
        kind: "artigo",
        source: "react.dev",
        minutes: 45,
      },
    ],
    exercise: {
      title: "Quebre uma tela em componentes",
      description:
        "Pegue uma tela do produto e desenhe, no papel, onde começam e terminam os componentes. Só depois escreva o código.",
      steps: [
        "Marque na imagem os limites de cada componente e dê nome a eles.",
        "Defina que props cada um recebe — e tipe todas.",
        "Implemente de baixo para cima: os menores primeiro.",
        "Confirme que nenhum componente sabe de onde o dado veio.",
      ],
    },
    doneWhen: [
      "Nenhum componente passa de 150 linhas.",
      "As props estão tipadas, sem `any`.",
      "Você consegue reusar pelo menos um componente em outro lugar sem alterá-lo.",
    ],
    prerequisites: ["typescript"],
  },
  {
    id: "react-estado",
    order: 180,
    trackId: "front",
    phaseId: "especializacao",
    title: "Estado e efeitos",
    summary: "`useState`, `useEffect` e por que a maioria dos efeitos não deveria existir.",
    goal: "Decidir onde o estado mora e escrever efeitos apenas quando há sincronização real com o mundo externo.",
    whyHere:
      "Bug de estado é o mais caro de investigar porque não quebra na hora — aparece três telas depois. Acertar isso desde cedo economiza dias.",
    estimatedHours: 14,
    resources: [
      {
        label: "Gerenciando o estado",
        url: "https://pt-br.react.dev/learn/managing-state",
        kind: "doc",
        source: "react.dev",
        minutes: 240,
      },
      {
        label: "Você talvez não precise de um efeito",
        url: "https://pt-br.react.dev/learn/you-might-not-need-an-effect",
        kind: "artigo",
        source: "react.dev",
        minutes: 60,
      },
      {
        label: "React: lidando com Hooks",
        url: "https://www.alura.com.br/cursos-online-front-end/react",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 600,
      },
    ],
    exercise: {
      title: "Remova efeitos desnecessários",
      description:
        "Pegue um componente com vários `useEffect` e reduza ao mínimo. Boa parte deles é estado derivado disfarçado.",
      steps: [
        "Liste cada `useEffect` e o que ele sincroniza.",
        "Todo efeito que só calcula valor a partir de props ou estado: apague e calcule direto na renderização.",
        "Todo efeito que só reage a evento do usuário: mova para o manipulador do evento.",
        "O que sobrar deve tocar algo fora do React — rede, timer, DOM, assinatura.",
      ],
      snippet: {
        language: "typescript",
        code: "// Antes: efeito para manter um estado derivado\nconst [total, setTotal] = useState(0);\nuseEffect(() => {\n  setTotal(itens.reduce((s, i) => s + i.valor, 0));\n}, [itens]);\n\n// Depois: derive na renderização, sem efeito e sem estado extra\nconst total = itens.reduce((soma, item) => soma + item.valor, 0);",
      },
    },
    doneWhen: [
      "Todo `useEffect` que sobrou sincroniza com algo fora do React.",
      "Você sabe explicar por que estado derivado não precisa de `useState`.",
      "Nenhum efeito dispara em loop.",
    ],
    quiz: [
      {
        id: "front-q1",
        question: "Quando um `useEffect` é realmente necessário?",
        options: [
          "Sempre que um estado muda",
          "Para calcular um valor a partir de props",
          "Para sincronizar com algo fora do React: rede, timer, assinatura, DOM",
          "Para atualizar outro estado",
        ],
        answerIndex: 2,
        explanation:
          "Efeito serve para sair do React e voltar. Valor derivado se calcula na renderização; reação a clique vai no manipulador do evento.",
      },
    ],
    prerequisites: ["react-componentes"],
  },
  {
    id: "formularios",
    order: 190,
    trackId: "front",
    phaseId: "especializacao",
    title: "Formulários e validação",
    summary: "A parte da interface que mais recebe erro do usuário — e mais é feita às pressas.",
    goal: "Construir um formulário acessível, validado, com estados de erro e carregamento tratados.",
    whyHere:
      "Formulário é onde o usuário nos dá dado errado, clica duas vezes e perde conexão. É o componente que mais precisa de estado de erro pensado.",
    estimatedHours: 10,
    resources: [
      {
        label: "React Hook Form",
        url: "https://react-hook-form.com/get-started",
        kind: "doc",
        source: "React Hook Form",
        minutes: 90,
      },
      {
        label: "Zod — validação com tipos derivados",
        url: "https://zod.dev/",
        kind: "doc",
        source: "Zod",
        minutes: 60,
      },
      {
        label: "Learn Forms",
        url: "https://web.dev/learn/forms",
        kind: "curso",
        source: "web.dev",
        minutes: 300,
      },
    ],
    exercise: {
      title: "Um formulário que sobrevive ao usuário real",
      description:
        "Monte um cadastro com validação e trate os quatro estados que quase todo mundo esquece.",
      steps: [
        "Valide no envio e mostre o erro ao lado do campo, associado por `aria-describedby`.",
        "Desabilite o botão durante o envio e mostre que algo está acontecendo.",
        "Trate a falha de rede sem perder o que o usuário digitou.",
        "Garanta que dá para preencher e enviar tudo só pelo teclado.",
      ],
    },
    doneWhen: [
      "Erro de campo é lido por leitor de tela, não só mostrado em vermelho.",
      "Clicar duas vezes em enviar não cria dois registros.",
      "Falha de rede preserva os dados já digitados.",
    ],
    prerequisites: ["react-estado"],
  },
  {
    id: "design-system-clg",
    order: 210,
    trackId: "front",
    phaseId: "especializacao",
    title: "Tailwind v4 e o design system da CLG",
    summary: "Usar token, nunca hex solto. A marca é regra, não sugestão.",
    goal: "Construir telas usando exclusivamente os tokens do `@clg/design-system`, no tema escuro e no claro.",
    whyHere:
      "Esta trilha que você está lendo agora foi construída com esse pacote. Cor hardcoded quebra o tema claro e descaracteriza a marca — e a revisão vai barrar.",
    estimatedHours: 8,
    resources: [
      {
        label: "README do @clg/design-system",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
      {
        label: "Tailwind CSS — documentação v4",
        url: "https://tailwindcss.com/docs",
        kind: "doc",
        source: "Tailwind",
      },
      {
        label: "Tailwind: estilizando com classes utilitárias",
        url: "https://www.alura.com.br/cursos-online-front-end",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 480,
      },
    ],
    exercise: {
      title: "Encontre e elimine as cores soltas",
      description:
        "Procure valores de cor cravados no código de um projeto e troque por token do tema. Depois valide nos dois temas.",
      steps: [
        "Busque por `#` e por `rgb(` nos arquivos de componente.",
        "Troque cada ocorrência pelo token equivalente (`bg-card`, `text-muted-foreground`, `border-border`).",
        "Alterne para o tema claro e confira se tudo continua legível.",
        "Confirme o contraste mínimo de 4.5:1 no texto de corpo.",
      ],
      snippet: {
        language: "tsx",
        code: '// Errado: quebra no tema claro e ignora a marca\n<div className="bg-[#141414] text-[#E6E6E6] border-[#292929]">\n\n// Certo: o token decide, e os dois temas funcionam\n<div className="bg-card text-foreground border-border">',
      },
    },
    doneWhen: [
      "Nenhum valor de cor cravado no código que você escreveu.",
      "A tela funciona no tema escuro e no claro sem ajuste manual.",
      "O dourado aparece só em ação primária, foco e estado ativo — nunca como fundo de área grande.",
    ],
    quiz: [
      {
        id: "front-q2",
        question: "Onde o dourado da CLG pode ser usado?",
        options: [
          "Como fundo de seções inteiras, para reforçar a marca",
          "Em ação primária, borda de foco e ícone ativo",
          "Em qualquer texto que precise de destaque",
          "Em qualquer lugar, é a cor da marca",
        ],
        answerIndex: 1,
        explanation:
          "O design system é explícito: dourado é acento, não superfície. Área grande preenchida quebra o contraste do texto e descaracteriza a identidade.",
      },
    ],
    prerequisites: ["react-componentes", "css-moderno"],
  },
  {
    id: "shadcn",
    order: 220,
    trackId: "front",
    phaseId: "especializacao",
    title: "shadcn/ui na prática",
    summary: "Componentes que você copia para dentro do projeto — e passa a ser dono.",
    goal: "Adicionar componentes do shadcn/ui, entender que o código passa a ser seu e saber quando customizar.",
    whyHere:
      "O `components.json` da CLG já está configurado. O erro comum é alterar cor dentro do componente em vez de ajustar o token — e aí o tema para de valer.",
    estimatedHours: 6,
    resources: [
      {
        label: "shadcn/ui — instalação e uso",
        url: "https://ui.shadcn.com/docs",
        kind: "doc",
        source: "shadcn/ui",
        minutes: 120,
      },
      {
        label: "Radix UI Primitives — a base acessível por trás",
        url: "https://www.radix-ui.com/primitives/docs/overview/introduction",
        kind: "doc",
        source: "Radix",
        minutes: 60,
      },
    ],
    exercise: {
      title: "Adicione e adapte um componente",
      description:
        "Instale um `dialog` e adapte ao contexto do projeto sem tocar em nenhuma cor dentro do componente.",
      steps: [
        "Rode o comando de adição do shadcn.",
        "Leia o código gerado inteiro antes de usar.",
        "Adapte o comportamento ao caso de uso real.",
        "Se precisar mudar cor, altere o token no tema — não o componente.",
      ],
      snippet: {
        language: "bash",
        code: "npx shadcn@latest add dialog button tooltip",
      },
    },
    doneWhen: [
        "Você leu o código do componente gerado, não só usou.",
        "Nenhuma cor foi alterada dentro do componente.",
        "O componente fecha com Esc e devolve o foco para quem o abriu.",
    ],
    prerequisites: ["design-system-clg"],
  },
  {
    id: "rotas-dados",
    order: 200,
    trackId: "front",
    phaseId: "especializacao",
    title: "Rotas e busca de dados",
    summary: "Navegação, carregamento, erro e vazio — os quatro estados de toda tela com dados.",
    goal: "Estruturar rotas e buscar dados tratando carregamento, erro e lista vazia como parte do trabalho.",
    whyHere:
      "Tela que só funciona no caminho feliz volta da revisão. Os três estados restantes são onde o usuário real passa boa parte do tempo.",
    estimatedHours: 10,
    resources: [
      {
        label: "React Router — tutorial",
        url: "https://reactrouter.com/start/declarative/installation",
        kind: "doc",
        source: "React Router",
        minutes: 120,
      },
      {
        label: "TanStack Query — visão geral",
        url: "https://tanstack.com/query/latest/docs/framework/react/overview",
        kind: "doc",
        source: "TanStack",
        minutes: 150,
      },
    ],
    exercise: {
      title: "Uma tela com os quatro estados",
      description:
        "Monte uma listagem que busca dados de uma API e trate explicitamente cada estado possível.",
      steps: [
        "Carregando: use esqueleto de conteúdo, não um spinner centralizado.",
        "Erro: diga o que houve e ofereça tentar de novo.",
        "Vazio: explique o que a tela mostraria e como chegar lá.",
        "Sucesso: a lista renderizada, com paginação se fizer sentido.",
      ],
    },
    doneWhen: [
      "Os quatro estados existem e você consegue provocar cada um.",
      "O estado vazio ensina algo, em vez de dizer 'nenhum resultado'.",
      "Erro de rede não deixa a tela em branco.",
    ],
    prerequisites: ["react-estado"],
  },
  {
    id: "devtools",
    order: 230,
    trackId: "front",
    phaseId: "especializacao",
    title: "Depuração no navegador",
    summary: "Parar de adivinhar. `console.log` é o começo, não o método.",
    goal: "Investigar um bug de interface usando breakpoints, React DevTools e a aba Network.",
    whyHere:
      "A diferença entre resolver um bug em vinte minutos ou em dois dias quase nunca é conhecimento de framework — é método de investigação.",
    estimatedHours: 6,
    resources: [
      {
        label: "Chrome DevTools — documentação",
        url: "https://developer.chrome.com/docs/devtools",
        kind: "doc",
        source: "Google",
        minutes: 180,
      },
      {
        label: "React Developer Tools",
        url: "https://pt-br.react.dev/learn/react-developer-tools",
        kind: "ferramenta",
        source: "react.dev",
        minutes: 30,
      },
    ],
    exercise: {
      title: "Cace um bug sem `console.log`",
      description:
        "Peça ao mentor um bug real já resolvido. Investigue usando só breakpoints e as ferramentas do navegador.",
      steps: [
        "Reproduza o bug de forma consistente antes de qualquer coisa.",
        "Coloque um breakpoint e inspecione os valores no momento da falha.",
        "Confira as props e o estado do componente no React DevTools.",
        "Escreva a causa raiz em uma frase antes de corrigir.",
      ],
    },
    doneWhen: [
      "Você reproduz o bug de propósito, quando quiser.",
      "Você usa breakpoint em vez de espalhar `console.log`.",
      "Você descreve a causa raiz, não só o sintoma.",
    ],
    prerequisites: ["rotas-dados"],
  },
  {
    id: "responsivo",
    order: 90,
    trackId: "front",
    phaseId: "fundamentos",
    title: "Responsivo de verdade",
    summary: "Uma interface, todas as telas — sem versão mobile separada.",
    goal: "Construir layouts que funcionam de 320px a 1920px sem quebrar e sem rolagem horizontal.",
    whyHere:
      "Boa parte do acesso aos produtos que a gente entrega vem do celular. Layout que só funciona no monitor do dev é metade do trabalho entregue.",
    estimatedHours: 10,
    resources: [
      {
        label: "Learn Responsive Design",
        url: "https://web.dev/learn/design",
        kind: "curso",
        source: "web.dev",
        minutes: 360,
      },
      {
        label: "Design responsivo — guia da MDN",
        url: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
        kind: "doc",
        source: "MDN",
        minutes: 90,
      },
      {
        label: "Container queries",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries",
        kind: "doc",
        source: "MDN",
        minutes: 45,
      },
    ],
    exercise: {
      title: "Uma tela, cinco larguras",
      description:
        "Pegue uma tela que você já construiu e faça ela sobreviver a cinco larguras diferentes, sem CSS duplicado.",
      steps: [
        "Comece pelo celular e só então adicione as regras de tela maior.",
        "Teste em 320, 375, 768, 1280 e 1920 pixels.",
        "Troque toda largura fixa por `max-width`, `%` ou unidade relativa.",
        "Confirme que nenhuma tabela ou bloco de código causa rolagem horizontal na página.",
      ],
      snippet: {
        language: "css",
        code: "/* Mobile primeiro: o padrão é a tela pequena, e a media query\n   adiciona o que só faz sentido quando há espaço sobrando. */\n.cartoes {\n  display: grid;\n  gap: 1rem;\n  grid-template-columns: 1fr;\n}\n\n@media (min-width: 48rem) {\n  .cartoes {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}",
      },
    },
    doneWhen: [
      "Nenhuma largura entre 320px e 1920px gera rolagem horizontal.",
      "Você escreveu mobile primeiro, com `min-width` — não o contrário.",
      "Conteúdo largo (tabela, código) rola dentro do próprio bloco, não na página.",
    ],
    quiz: [
      {
        id: "front-q3",
        question: "Por que escrever `min-width` em vez de `max-width` nas media queries?",
        options: [
          "É mais rápido para o navegador",
          "Parte da tela pequena e vai adicionando — o padrão fica sendo o caso mais restrito",
          "`max-width` não funciona em celular",
          "Não faz diferença nenhuma",
        ],
        answerIndex: 1,
        explanation:
          "Mobile primeiro faz o CSS base servir a tela mais apertada, e cada media query só acrescenta. Com `max-width` você escreve o desktop e depois desfaz coisa — sobra CSS morto e regra brigando.",
      },
    ],
    prerequisites: ["css-moderno"],
  },
  {
    id: "testes-interface",
    order: 240,
    trackId: "front",
    phaseId: "especializacao",
    title: "Testes de interface",
    summary: "Testar o que o usuário faz, não como o componente foi escrito por dentro.",
    goal: "Escrever testes que simulam o uso real e sobrevivem a uma refatoração interna.",
    whyHere:
      "Sem teste de interface, toda mudança vira clicar na tela para conferir. Com teste, a esteira confere em segundos o que levaria vinte minutos.",
    estimatedHours: 10,
    resources: [
      {
        label: "Testing Library — React",
        url: "https://testing-library.com/docs/react-testing-library/intro/",
        kind: "doc",
        source: "Testing Library",
        minutes: 120,
      },
      {
        label: "Sobre as consultas: qual usar primeiro",
        url: "https://testing-library.com/docs/queries/about/",
        kind: "doc",
        source: "Testing Library",
        minutes: 45,
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
      title: "Teste um formulário como um usuário",
      description:
        "Escreva testes para o formulário do módulo anterior usando só o que o usuário enxerga: rótulo, texto e função.",
      steps: [
        "Busque elementos por papel e rótulo, nunca por classe CSS ou id.",
        "Preencha e envie o formulário como uma pessoa faria.",
        "Teste o caminho de erro: campo inválido e falha de rede.",
        "Refatore o componente por dentro e confirme que os testes seguem verdes.",
      ],
      snippet: {
        language: "typescript",
        code: 'it("mostra erro quando o e-mail é inválido", async () => {\n  render(<Cadastro />);\n\n  // getByRole e getByLabelText enxergam a tela como o usuário\n  // (e como um leitor de tela) — não como o DOM foi montado.\n  await userEvent.type(screen.getByLabelText("E-mail"), "invalido");\n  await userEvent.click(screen.getByRole("button", { name: "Cadastrar" }));\n\n  expect(await screen.findByText(/e-mail inválido/i)).toBeVisible();\n});',
      },
    },
    doneWhen: [
      "Nenhum teste busca elemento por classe CSS ou id.",
      "Os testes continuam passando depois de você reescrever o componente por dentro.",
      "Existe teste para pelo menos um caminho de erro.",
    ],
    prerequisites: ["formularios"],
  },
  {
    id: "a11y-testes",
    order: 250,
    trackId: "front",
    phaseId: "especializacao",
    title: "Acessibilidade que se verifica",
    summary: "Sair da intenção e passar a medir: contraste, foco, leitor de tela.",
    goal: "Auditar uma tela com ferramenta automática e com teclado, e corrigir o que aparecer.",
    whyHere:
      "Acessibilidade aparece em contrato e em auditoria de cliente. Ferramenta automática pega cerca de um terço dos problemas — o resto é você navegando com Tab.",
    estimatedHours: 8,
    resources: [
      {
        label: "WCAG 2.2 em resumo prático",
        url: "https://www.w3.org/WAI/WCAG22/quickref/",
        kind: "doc",
        source: "W3C",
        minutes: 90,
      },
      {
        label: "axe DevTools — extensão de auditoria",
        url: "https://www.deque.com/axe/devtools/",
        kind: "ferramenta",
        source: "Deque",
        minutes: 30,
      },
      {
        label: "Padrões ARIA para componentes",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/",
        kind: "doc",
        source: "W3C",
        minutes: 120,
      },
      {
        label: "Lighthouse — auditoria no navegador",
        url: "https://developer.chrome.com/docs/lighthouse/overview",
        kind: "ferramenta",
        source: "Google",
        minutes: 45,
      },
    ],
    exercise: {
      title: "Audite uma tela do produto",
      description:
        "Rode a auditoria automática, corrija o que ela achou e depois faça a parte que nenhuma ferramenta faz por você.",
      steps: [
        "Rode o axe ou o Lighthouse e liste os problemas encontrados.",
        "Corrija contraste, rótulo faltando e ordem de cabeçalho.",
        "Navegue a tela inteira só com Tab: o foco fica sempre visível e na ordem certa?",
        "Abra um leitor de tela e escute a tela ser lida do começo ao fim.",
      ],
    },
    doneWhen: [
      "A auditoria automática passa sem erro crítico.",
      "Dá para completar a tarefa principal da tela só com teclado.",
      "Todo texto de corpo tem contraste de pelo menos 4.5:1.",
    ],
    quiz: [
      {
        id: "front-q4",
        question: "A auditoria automática passou 100%. A tela está acessível?",
        options: [
          "Sim, 100% é o objetivo",
          "Não necessariamente: ferramenta pega cerca de um terço dos problemas",
          "Só se usar React",
          "Depende do navegador",
        ],
        answerIndex: 1,
        explanation:
          "Ferramenta acha contraste, `alt` faltando e ARIA malformada. Não acha ordem de foco ilógica, rótulo que mente sobre a função, nem fluxo impossível de completar com teclado. Isso é você quem testa.",
      },
    ],
    prerequisites: ["html-acessibilidade", "formularios"],
  },
  {
    id: "performance-front",
    order: 260,
    trackId: "front",
    phaseId: "especializacao",
    title: "Performance percebida",
    summary: "O que o usuário sente é o que conta — e dá para medir.",
    goal: "Medir as Core Web Vitals de uma tela e reduzir o que estiver ruim, com número antes e depois.",
    whyHere:
      "Tela lenta derruba conversão no cliente e vira reclamação que chega até a gente. Quase sempre a causa é imagem sem otimizar ou pacote grande demais — as duas coisas têm solução simples.",
    estimatedHours: 10,
    resources: [
      {
        label: "Core Web Vitals",
        url: "https://web.dev/articles/vitals",
        kind: "artigo",
        source: "web.dev",
        minutes: 45,
      },
      {
        label: "Learn Performance",
        url: "https://web.dev/learn/performance",
        kind: "curso",
        source: "web.dev",
        minutes: 300,
      },
      {
        label: "Lighthouse — como interpretar o relatório",
        url: "https://developer.chrome.com/docs/lighthouse/performance/performance-scoring",
        kind: "doc",
        source: "Google",
        minutes: 45,
      },
    ],
    exercise: {
      title: "Meça, corrija, meça de novo",
      description:
        "Sem número antes e depois não é otimização, é palpite. O exercício exige os dois.",
      steps: [
        "Rode o Lighthouse e anote LCP, CLS e INP.",
        "Ataque a maior causa primeiro: normalmente imagem ou JavaScript demais.",
        "Adicione dimensão explícita nas imagens para eliminar deslocamento de layout.",
        "Rode de novo e registre a diferença.",
      ],
    },
    doneWhen: [
      "Você tem número antes e depois, não impressão.",
      "Nenhuma imagem causa deslocamento de layout ao carregar.",
      "Você sabe dizer qual foi o maior gargalo e por quê.",
    ],
    prerequisites: ["devtools"],
  },
];
