import type { Module } from "../types";

/** Trilha de back-end: fundamentos próprios (dias 6–30) e especialização (31–60). */
export const backModules: Module[] = [
  {
    id: "node-typescript",
    order: 270,
    trackId: "back",
    phaseId: "especializacao",
    title: "Node com TypeScript",
    summary: "O mesmo idioma do front, com outras regras: sistema de arquivos, processo e ambiente.",
    goal: "Montar um projeto Node em TypeScript do zero, com scripts, variáveis de ambiente e execução em desenvolvimento.",
    whyHere:
      "Nosso back é Node. Você já sabe a linguagem — o que muda é o ambiente: não existe navegador, existe processo, arquivo e variável de ambiente.",
    estimatedHours: 10,
    resources: [
      {
        label: "Node.js — guia de introdução",
        url: "https://nodejs.org/pt-br/learn/getting-started/introduction-to-nodejs",
        kind: "doc",
        source: "Node.js",
        minutes: 120,
      },
      {
        label: "Formação Node.js",
        url: "https://www.alura.com.br/formacao-nodejs",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 1500,
      },
      {
        label: "Back End Development and APIs",
        url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/",
        kind: "curso",
        source: "freeCodeCamp",
        certificate: true,
        minutes: 1200,
      },
    ],
    exercise: {
      title: "Um projeto Node do zero",
      description:
        "Sem template. Criar cada arquivo à mão ensina o que cada um faz — depois você usa template sabendo o que ele gerou.",
      steps: [
        "Inicialize o projeto e instale TypeScript.",
        "Configure o `tsconfig.json` em modo estrito.",
        "Crie um script que lê uma variável de ambiente e falha claro se ela faltar.",
        "Adicione scripts de desenvolvimento e de build.",
      ],
      snippet: {
        language: "typescript",
        code: "const databaseUrl = process.env.DATABASE_URL;\n\nif (!databaseUrl) {\n  // Falhar cedo e explicando o que falta é melhor que\n  // quebrar cinco camadas adiante com 'undefined'.\n  throw new Error(\"DATABASE_URL não foi definida no ambiente\");\n}",
      },
    },
    doneWhen: [
      "O projeto roda em desenvolvimento e compila sem erro.",
      "Variável de ambiente faltando gera erro claro na inicialização.",
      "O `.env` está no `.gitignore` e existe um `.env.example` versionado.",
    ],
    prerequisites: ["typescript", "servidor-processo"],
  },
  {
    id: "http-rest",
    order: 280,
    trackId: "back",
    phaseId: "especializacao",
    title: "HTTP e API REST",
    summary: "Rotas, métodos, status e o contrato que o front vai consumir.",
    goal: "Expor uma API REST com rotas bem nomeadas, métodos corretos e status honestos.",
    whyHere:
      "A API é o contrato entre você e o front. Rota mal desenhada não some com refatoração — ela vira dependência de outros times.",
    estimatedHours: 14,
    resources: [
      {
        label: "Fastify — documentação",
        url: "https://fastify.dev/docs/latest/",
        kind: "doc",
        source: "Fastify",
        minutes: 180,
      },
      {
        label: "Express — guia de rotas",
        url: "https://expressjs.com/pt-br/guide/routing.html",
        kind: "doc",
        source: "Express",
        minutes: 60,
      },
      {
        label: "Métodos de requisição HTTP",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Methods",
        kind: "doc",
        source: "MDN",
        minutes: 30,
      },
    ],
    exercise: {
      title: "CRUD completo com status corretos",
      description:
        "Implemente as cinco operações de um recurso e escolha conscientemente o status de cada resposta.",
      steps: [
        "Liste, busque por id, crie, atualize e remova.",
        "Devolva 201 na criação, com o recurso criado no corpo.",
        "Devolva 404 quando o id não existir — não 200 com corpo vazio.",
        "Teste cada rota com um cliente HTTP antes de considerar pronto.",
      ],
      snippet: {
        language: "typescript",
        code: 'app.get("/pedidos/:id", async (request, reply) => {\n  const pedido = await repositorio.buscarPorId(request.params.id);\n\n  if (!pedido) {\n    return reply.status(404).send({ erro: "Pedido não encontrado" });\n  }\n\n  return reply.send(pedido);\n});',
      },
    },
    doneWhen: [
      "Cada rota devolve o status que descreve o que de fato aconteceu.",
      "Os nomes de rota são substantivos no plural, sem verbo.",
      "Você testou todas as rotas, incluindo os caminhos de erro.",
    ],
    quiz: [
      {
        id: "back-q1",
        question: "Qual status devolver quando um recurso é criado com sucesso?",
        options: ["200", "201", "204", "302"],
        answerIndex: 1,
        explanation:
          "201 Created informa que algo novo passou a existir, e o cabeçalho `Location` ou o corpo indicam onde. 200 diz apenas 'deu certo', sem essa informação.",
      },
    ],
    prerequisites: ["node-typescript", "como-a-web-funciona"],
  },
  {
    id: "validacao-erros",
    order: 290,
    trackId: "back",
    phaseId: "especializacao",
    title: "Validação e tratamento de erro",
    summary: "Nunca confie no que chega. Nem do front, nem de integração, nem de você mesmo.",
    goal: "Validar toda entrada na borda da API e devolver erros que ajudem quem consome.",
    whyHere:
      "Dado inválido que entra no banco vira problema permanente. Validar na borda é a diferença entre um erro 400 e uma migração de correção às duas da manhã.",
    estimatedHours: 8,
    resources: [
      {
        label: "Zod — validação de esquemas",
        url: "https://zod.dev/",
        kind: "doc",
        source: "Zod",
        minutes: 90,
      },
      {
        label: "OWASP Top 10",
        url: "https://owasp.org/www-project-top-ten/",
        kind: "artigo",
        source: "OWASP",
        minutes: 90,
      },
    ],
    exercise: {
      title: "Blinde a borda da sua API",
      description:
        "Valide todas as entradas e padronize o formato de erro para o front conseguir tratar sem adivinhação.",
      steps: [
        "Escreva um esquema de validação para o corpo de cada rota de escrita.",
        "Devolva 400 com a lista de campos inválidos e o motivo de cada um.",
        "Crie um manipulador de erro central para não repetir `try/catch`.",
        "Garanta que erro interno não vaze detalhe de banco na resposta.",
      ],
      snippet: {
        language: "typescript",
        code: 'const criarPedido = z.object({\n  clienteId: z.string().uuid(),\n  valor: z.number().positive(),\n  observacao: z.string().max(500).optional(),\n});\n\n// O tipo sai do esquema: uma fonte de verdade só.\ntype CriarPedido = z.infer<typeof criarPedido>;',
      },
    },
    doneWhen: [
      "Toda rota de escrita valida a entrada antes de tocar no banco.",
      "O formato de erro é o mesmo em toda a API.",
      "Nenhuma mensagem de erro expõe SQL, caminho de arquivo ou stack.",
    ],
    prerequisites: ["http-rest"],
  },
  {
    id: "sql-modelagem",
    order: 300,
    trackId: "back",
    phaseId: "especializacao",
    title: "SQL e modelagem em Postgres",
    summary: "Modelar antes de codar. Tabela mal desenhada acompanha o produto por anos.",
    goal: "Modelar um domínio em tabelas normalizadas e escrever consultas com junções e agregações.",
    whyHere:
      "ORM esconde SQL até o dia em que uma consulta fica lenta. Quem entende o banco resolve; quem só conhece o ORM fica preso.",
    estimatedHours: 16,
    resources: [
      {
        label: "PostgreSQL — tutorial oficial",
        url: "https://www.postgresql.org/docs/current/tutorial.html",
        kind: "doc",
        source: "PostgreSQL",
        minutes: 300,
      },
      {
        label: "Formação SQL com PostgreSQL",
        url: "https://www.alura.com.br/formacao-sql-postgresql",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 1200,
      },
      {
        label: "SQL para iniciantes",
        url: "https://sqlbolt.com/",
        kind: "curso",
        source: "SQLBolt",
        minutes: 180,
      },
      {
        label: "Relational Database",
        url: "https://www.freecodecamp.org/learn/relational-database/",
        kind: "curso",
        source: "freeCodeCamp",
        certificate: true,
        minutes: 1500,
      },
    ],
    exercise: {
      title: "Modele um domínio real do produto",
      description:
        "Pegue uma parte do produto com o mentor e modele do zero, em SQL, sem ORM no caminho.",
      steps: [
        "Desenhe as entidades e os relacionamentos no papel primeiro.",
        "Escreva o `CREATE TABLE` com chaves, tipos e restrições adequados.",
        "Popule com dados de exemplo que incluam casos de borda.",
        "Escreva três consultas com junção e uma com agregação.",
      ],
      snippet: {
        language: "sql",
        code: "SELECT c.nome,\n       COUNT(p.id)      AS total_pedidos,\n       SUM(p.valor)     AS valor_total\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nWHERE p.criado_em >= NOW() - INTERVAL '30 days'\nGROUP BY c.nome\nORDER BY valor_total DESC\nLIMIT 10;",
      },
    },
    doneWhen: [
      "Toda tabela tem chave primária e as chaves estrangeiras estão declaradas.",
      "Você sabe a diferença entre `INNER JOIN` e `LEFT JOIN` na prática.",
      "Você usou `EXPLAIN` para olhar o plano de uma consulta.",
    ],
    quiz: [
      {
        id: "back-q2",
        question: "Por que declarar chave estrangeira em vez de só guardar o id?",
        options: [
          "Deixa a consulta mais rápida",
          "O banco passa a impedir referência para registro inexistente",
          "É exigência do ORM",
          "Economiza espaço em disco",
        ],
        answerIndex: 1,
        explanation:
          "A restrição garante integridade referencial no próprio banco. Sem ela, um bug na aplicação deixa registros órfãos que ninguém percebe até o relatório sair errado.",
      },
    ],
    prerequisites: ["modelagem-dados", "docker-usuario"],
  },
  {
    id: "orm-migrations",
    order: 310,
    trackId: "back",
    phaseId: "especializacao",
    title: "ORM e migrations",
    summary: "Mudança de esquema versionada, aplicável e reversível.",
    goal: "Usar um ORM para modelar, consultar e evoluir o esquema por migrations versionadas.",
    whyHere:
      "Alterar tabela na mão em produção é como fazer deploy por FTP. Migration versionada é o que permite subir mudança de banco com segurança.",
    estimatedHours: 12,
    resources: [
      {
        label: "Prisma — comece por aqui",
        url: "https://www.prisma.io/docs/getting-started",
        kind: "doc",
        source: "Prisma",
        minutes: 180,
      },
      {
        label: "Drizzle ORM — documentação",
        url: "https://orm.drizzle.team/docs/overview",
        kind: "doc",
        source: "Drizzle",
        minutes: 150,
      },
      {
        label: "ORM escolhido nos projetos da CLG e o porquê",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
    ],
    exercise: {
      title: "Evolua um esquema sem perder dado",
      description:
        "Adicionar coluna é fácil. O exercício é a mudança que exige mover dados existentes.",
      steps: [
        "Modele o esquema do exercício anterior no ORM.",
        "Gere a migration inicial e aplique.",
        "Adicione um campo obrigatório a uma tabela que já tem dados.",
        "Escreva a migration em três passos: criar opcional, preencher, tornar obrigatório.",
      ],
    },
    doneWhen: [
      "As migrations estão versionadas no Git e aplicam do zero sem erro.",
      "Você adicionou um campo obrigatório sem quebrar dado existente.",
      "Você sabe como reverter a última migration.",
    ],
    prerequisites: ["sql-modelagem"],
  },
  {
    id: "auth-seguranca",
    order: 330,
    trackId: "back",
    phaseId: "especializacao",
    title: "Autenticação e segurança básica",
    summary: "Senha, sessão e as falhas que aparecem em toda auditoria.",
    goal: "Implementar login com senha guardada com hash e proteger rotas por autenticação.",
    whyHere:
      "Falha de autenticação é o tipo de bug que não dá para corrigir depois de explorado. É a área onde 'depois eu melhoro' custa mais caro.",
    estimatedHours: 12,
    resources: [
      {
        label: "OWASP Top 10 — riscos mais comuns",
        url: "https://owasp.org/www-project-top-ten/",
        kind: "artigo",
        source: "OWASP",
        minutes: 120,
      },
      {
        label: "OWASP Cheat Sheet — armazenamento de senha",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
        kind: "artigo",
        source: "OWASP",
        minutes: 45,
      },
      {
        label: "Introdução ao JWT",
        url: "https://jwt.io/introduction",
        kind: "artigo",
        source: "jwt.io",
        minutes: 30,
      },
      {
        label: "Política de segurança e tratamento de dados da CLG",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
    ],
    exercise: {
      title: "Login que aguenta revisão",
      description:
        "Implemente cadastro e login, e depois tente quebrar o que você mesmo escreveu.",
      steps: [
        "Guarde a senha com hash e sal — nunca em texto puro, nunca com MD5 ou SHA1 puro.",
        "Proteja as rotas privadas com verificação de sessão ou token.",
        "Faça a mensagem de erro de login ser igual para usuário inexistente e senha errada.",
        "Adicione limite de tentativas por IP.",
      ],
    },
    doneWhen: [
      "Nenhuma senha aparece em texto puro no banco ou nos logs.",
      "Rota privada sem credencial devolve 401.",
      "A mensagem de erro não revela se o e-mail existe.",
    ],
    quiz: [
      {
        id: "back-q3",
        question: "Por que a mensagem de erro do login deve ser igual nos dois casos?",
        options: [
          "Para simplificar o código",
          "Para não revelar quais e-mails estão cadastrados",
          "Porque o padrão HTTP exige",
          "Para deixar a resposta mais rápida",
        ],
        answerIndex: 1,
        explanation:
          "Mensagens diferentes permitem descobrir quais e-mails existem na base — o primeiro passo de um ataque direcionado. Isso se chama enumeração de usuários.",
      },
    ],
    prerequisites: ["validacao-erros"],
  },
  {
    id: "testes-api",
    order: 350,
    trackId: "back",
    phaseId: "especializacao",
    title: "Testes de API",
    summary: "Teste não é burocracia: é o que deixa você refatorar sem medo.",
    goal: "Escrever testes automatizados que cobrem o caminho feliz e os erros de cada rota.",
    whyHere:
      "Sem teste, toda mudança vira verificação manual. Com teste, a esteira valida em segundos o que levaria vinte minutos clicando.",
    estimatedHours: 10,
    resources: [
      {
        label: "Vitest — guia",
        url: "https://vitest.dev/guide/",
        kind: "doc",
        source: "Vitest",
        minutes: 120,
      },
      {
        label: "Testes automatizados na prática",
        url: "https://www.alura.com.br/cursos-online-programacao/testes",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 600,
      },
    ],
    exercise: {
      title: "Cubra uma rota inteira",
      description:
        "Escolha a rota mais crítica da sua API e escreva os testes que você gostaria que existissem se alguém a refatorasse.",
      steps: [
        "Teste o caminho feliz primeiro.",
        "Teste entrada inválida e confirme o 400.",
        "Teste recurso inexistente e confirme o 404.",
        "Teste acesso sem autenticação e confirme o 401.",
      ],
    },
    doneWhen: [
      "Os testes rodam com um comando e passam do zero.",
      "Cada rota tem ao menos um teste de sucesso e um de erro.",
      "Os testes não dependem da ordem de execução entre si.",
    ],
    prerequisites: ["auth-seguranca"],
  },
  {
    id: "servidor-processo",
    order: 150,
    trackId: "back",
    phaseId: "fundamentos",
    title: "O que é um servidor, de verdade",
    summary: "Processo, porta, variável de ambiente — o mundo sem navegador.",
    goal: "Explicar o que acontece quando um servidor sobe e diagnosticar por que ele não subiu.",
    whyHere:
      "É o pulo conceitual que mais trava quem vem do front. Sem ele, `EADDRINUSE` e `ECONNREFUSED` parecem magia negra em vez de duas mensagens que dizem exatamente o que está errado.",
    estimatedHours: 8,
    resources: [
      {
        label: "Como o Node.js funciona por baixo",
        url: "https://nodejs.org/pt-br/learn/asynchronous-work/event-loop-timers-and-nexttick",
        kind: "doc",
        source: "Node.js",
        minutes: 90,
      },
      {
        label: "The Twelve-Factor App (em português)",
        url: "https://12factor.net/pt_br/",
        kind: "artigo",
        source: "12factor",
        minutes: 90,
      },
      {
        label: "O que é uma porta TCP",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/Port",
        kind: "doc",
        source: "MDN",
        minutes: 15,
      },
    ],
    exercise: {
      title: "Provoque os três erros clássicos",
      description:
        "Cada um desses erros vai aparecer para você dezenas de vezes. Encontrá-los de propósito, agora, economiza horas depois.",
      steps: [
        "Suba um servidor mínimo que responde numa porta e confirme no navegador.",
        "Suba um segundo na mesma porta e leia o `EADDRINUSE`.",
        "Tente acessar uma porta onde não há nada e leia o `ECONNREFUSED`.",
        "Descubra qual processo está ocupando uma porta e encerre-o.",
      ],
      snippet: {
        language: "typescript",
        code: 'import { createServer } from "node:http";\n\n// A porta vem do ambiente porque em produção quem escolhe é a plataforma.\nconst porta = Number(process.env.PORT ?? 3000);\n\ncreateServer((_req, res) => {\n  res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });\n  res.end("de pé\\n");\n}).listen(porta, () => {\n  console.log(`ouvindo em http://localhost:${porta}`);\n});',
      },
    },
    doneWhen: [
      "Você sabe o que `EADDRINUSE` e `ECONNREFUSED` significam, sem pesquisar.",
      "Você descobre qual processo ocupa uma porta e encerra.",
      "Você explica por que a porta deve vir de variável de ambiente.",
    ],
    quiz: [
      {
        id: "back-q4",
        question: "A API responde em `localhost:3000` na sua máquina, mas o colega não acessa. Por quê?",
        options: [
          "A porta está errada",
          "`localhost` é sempre a máquina de quem acessa — o servidor dele não existe",
          "Falta reiniciar o servidor",
          "É problema de CORS",
        ],
        answerIndex: 1,
        explanation:
          "`localhost` resolve para a própria máquina, sempre. Para outra pessoa alcançar, o servidor precisa estar num endereço acessível na rede — daí existirem ambientes de homologação.",
      },
    ],
    prerequisites: ["como-a-web-funciona"],
  },
  {
    id: "modelagem-dados",
    order: 160,
    trackId: "back",
    phaseId: "fundamentos",
    title: "Modelagem de dados",
    summary: "Pensar em entidades e relações antes de escrever uma linha de SQL.",
    goal: "Modelar um domínio no papel, identificando entidades, relações e cardinalidade.",
    whyHere:
      "Tabela mal desenhada acompanha o produto por anos e cada correção vira migração arriscada. Uma hora no papel economiza semanas de remendo.",
    estimatedHours: 8,
    resources: [
      {
        label: "Modelagem de dados: entidades e relacionamentos",
        url: "https://www.alura.com.br/cursos-online-data-science/data-science",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 480,
      },
      {
        label: "Normalização de banco de dados",
        url: "https://learn.microsoft.com/pt-br/office/troubleshoot/access/database-normalization-description",
        kind: "artigo",
        source: "Microsoft Learn",
        minutes: 45,
      },
      {
        label: "Tipos de dados do PostgreSQL",
        url: "https://www.postgresql.org/docs/current/datatype.html",
        kind: "doc",
        source: "PostgreSQL",
        minutes: 60,
      },
    ],
    exercise: {
      title: "Modele no papel antes do código",
      description:
        "Escolha uma parte do produto com o mentor e modele sem abrir editor. O objetivo é errar no papel, onde apagar é barato.",
      steps: [
        "Liste os substantivos do domínio: cada um é candidato a entidade.",
        "Desenhe as relações e marque a cardinalidade (um para muitos, muitos para muitos).",
        "Para cada campo, decida o tipo e se pode ser nulo — e justifique o nulo.",
        "Mostre ao mentor e defenda cada decisão antes de escrever SQL.",
      ],
    },
    doneWhen: [
      "Toda entidade tem identificador e você sabe explicar por que aquele.",
      "Nenhum campo aceita nulo sem um motivo que você consegue defender.",
      "Você identificou pelo menos uma relação muitos-para-muitos e sabe como resolvê-la.",
    ],
    quiz: [
      {
        id: "back-q5",
        question: "Como se representa uma relação muitos-para-muitos num banco relacional?",
        options: [
          "Com uma coluna de lista em uma das tabelas",
          "Com uma tabela intermediária ligando as duas",
          "Não é possível",
          "Duplicando as linhas nas duas tabelas",
        ],
        answerIndex: 1,
        explanation:
          "A tabela de junção guarda um par de chaves estrangeiras por vínculo. Guardar lista numa coluna quebra a integridade e torna consulta e atualização um pesadelo.",
      },
    ],
    prerequisites: [],
  },
  {
    id: "arquitetura-camadas",
    order: 320,
    trackId: "back",
    phaseId: "especializacao",
    title: "Arquitetura em camadas",
    summary: "Separar regra de negócio de rota e de banco — para poder trocar qualquer um deles.",
    goal: "Organizar uma API em camadas com responsabilidades claras e dependências numa direção só.",
    whyHere:
      "Regra de negócio dentro do arquivo de rota é o que transforma projeto de seis meses em projeto impossível de testar. Separar cedo custa quase nada.",
    estimatedHours: 12,
    resources: [
      {
        label: "Arquitetura limpa — o essencial",
        url: "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",
        kind: "artigo",
        source: "Robert C. Martin",
        minutes: 45,
      },
      {
        label: "Padrão repositório",
        url: "https://martinfowler.com/eaaCatalog/repository.html",
        kind: "artigo",
        source: "Martin Fowler",
        minutes: 20,
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
      title: "Extraia a regra de dentro da rota",
      description:
        "Pegue uma rota que faz tudo — valida, consulta o banco, decide e responde — e separe em camadas.",
      steps: [
        "A rota só traduz HTTP: lê a requisição, chama o serviço, devolve o status.",
        "O serviço concentra a regra de negócio e não sabe que HTTP existe.",
        "O repositório concentra o acesso ao banco e não sabe da regra.",
        "Escreva um teste do serviço sem subir servidor nem banco.",
      ],
      snippet: {
        language: "typescript",
        code: '// A rota não conhece SQL; o serviço não conhece HTTP.\n// É essa direção única que deixa o serviço testável sozinho.\nexport async function cancelarPedido(id: string): Promise<Pedido> {\n  const pedido = await pedidos.buscarPorId(id);\n\n  if (!pedido) throw new NaoEncontrado("Pedido não encontrado");\n  if (pedido.status === "enviado") {\n    throw new RegraViolada("Pedido enviado não pode ser cancelado");\n  }\n\n  return pedidos.atualizarStatus(id, "cancelado");\n}',
      },
    },
    doneWhen: [
      "Nenhum arquivo de rota contém SQL ou regra de negócio.",
      "Você testa a regra de negócio sem subir servidor.",
      "As dependências apontam numa direção só: rota → serviço → repositório.",
    ],
    prerequisites: ["validacao-erros", "orm-migrations"],
  },
  {
    id: "filas-jobs",
    order: 340,
    trackId: "back",
    phaseId: "especializacao",
    title: "Trabalho assíncrono: filas e agendamento",
    summary: "O que não cabe dentro de uma requisição HTTP.",
    goal: "Tirar tarefa lenta do caminho da requisição e processá-la em segundo plano com segurança.",
    whyHere:
      "Enviar e-mail, gerar relatório e chamar serviço externo dentro da requisição é o que faz a tela travar e o usuário clicar duas vezes. Fila resolve os dois problemas.",
    estimatedHours: 12,
    resources: [
      {
        label: "BullMQ — filas em Node com Redis",
        url: "https://docs.bullmq.io/",
        kind: "doc",
        source: "BullMQ",
        minutes: 150,
      },
      {
        label: "Idempotência: por que reprocessar não pode duplicar",
        url: "https://developer.mozilla.org/pt-BR/docs/Glossary/Idempotent",
        kind: "doc",
        source: "MDN",
        minutes: 20,
      },
      {
        label: "Padrão de fila de trabalho",
        url: "https://learn.microsoft.com/pt-br/azure/architecture/patterns/competing-consumers",
        kind: "artigo",
        source: "Microsoft Learn",
        minutes: 40,
      },
    ],
    exercise: {
      title: "Tire o e-mail de dentro da requisição",
      description:
        "Mova uma tarefa lenta para uma fila e trate o caso que todo mundo esquece: o job que falha e roda de novo.",
      steps: [
        "Identifique na sua API uma tarefa que não precisa terminar antes da resposta.",
        "Publique um job na fila e responda imediatamente ao cliente.",
        "Faça o processador ser idempotente: rodar duas vezes não pode duplicar efeito.",
        "Force uma falha e confirme que a nova tentativa não causa dano.",
      ],
    },
    doneWhen: [
      "A resposta da API não espera mais a tarefa lenta.",
      "Reprocessar o mesmo job não duplica e-mail, cobrança ou registro.",
      "Job que falha em definitivo vai para algum lugar onde alguém vê.",
    ],
    quiz: [
      {
        id: "back-q6",
        question: "Por que um processador de fila precisa ser idempotente?",
        options: [
          "Para rodar mais rápido",
          "Porque a fila pode entregar o mesmo job mais de uma vez, e reprocessar não pode duplicar efeito",
          "É exigência do Redis",
          "Para economizar memória",
        ],
        answerIndex: 1,
        explanation:
          "Falha de rede, reinício do processo ou nova tentativa fazem o mesmo job rodar duas vezes. Se ele não for idempotente, o cliente recebe dois e-mails — ou é cobrado duas vezes.",
      },
    ],
    prerequisites: ["arquitetura-camadas"],
  },
];
