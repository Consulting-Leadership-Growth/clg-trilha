import type { Module } from "../types";

/** Fase 1 — dias 6 a 30. Só o que as TRÊS trilhas precisam.
 *  Fundamento específico de uma trilha mora no arquivo dela. */
export const fundamentosModules: Module[] = [
  {
    id: "como-a-web-funciona",
    order: 60,
    trackId: "core",
    phaseId: "fundamentos",
    title: "Como a web funciona",
    summary: "O que acontece entre digitar um endereço e a página aparecer.",
    goal: "Descrever o caminho de uma requisição HTTP e interpretar códigos de status e cabeçalhos.",
    whyHere:
      "Metade dos bugs que você vai investigar aqui — CORS, cache, 401, timeout — só fazem sentido se você souber o que trafega entre o navegador e o servidor.",
    estimatedHours: 8,
    resources: [
      {
        label: "Visão geral do HTTP",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview",
        kind: "doc",
        source: "MDN",
        minutes: 60,
      },
      {
        label: "Códigos de status HTTP",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status",
        kind: "doc",
        source: "MDN",
        minutes: 45,
      },
      {
        label: "Cursos de infraestrutura e redes",
        url: "https://www.alura.com.br/cursos-online-infraestrutura",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 600,
      },
      {
        label: "Como funciona a internet",
        url: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work",
        kind: "artigo",
        source: "MDN",
        minutes: 30,
      },
    ],
    exercise: {
      title: "Investigue uma requisição real",
      description:
        "Abra a aba Network do navegador em um site do time e leia o que está acontecendo de verdade.",
      steps: [
        "Abra as ferramentas de desenvolvedor e vá na aba Network.",
        "Recarregue a página e escolha uma requisição de API.",
        "Anote método, status, cabeçalhos de requisição e de resposta.",
        "Explique por que aquele status foi retornado.",
      ],
    },
    doneWhen: [
      "Você sabe a diferença entre 401, 403, 404 e 500 sem consultar.",
      "Você consegue ler a aba Network e dizer qual requisição falhou e por quê.",
      "Você explica o que é um cabeçalho e para que serve `Content-Type`.",
    ],
    quiz: [
      {
        id: "web-q1",
        question: "A API respondeu 401. O que isso significa?",
        options: [
          "O servidor quebrou",
          "O recurso não existe",
          "Você não está autenticado",
          "Você está autenticado, mas não tem permissão",
        ],
        answerIndex: 2,
        explanation:
          "401 é 'não autenticado' — o servidor não sabe quem você é. Já 403 é 'autenticado, mas sem permissão'. Confundir os dois manda você depurar o lugar errado.",
      },
      {
        id: "web-q2",
        question: "Um erro de CORS aparece no console. Onde está a causa?",
        options: [
          "No código do front-end, que precisa de outro fetch",
          "Na configuração do servidor, que não permite a origem",
          "No navegador do usuário, que está desatualizado",
          "No DNS do domínio",
        ],
        answerIndex: 1,
        explanation:
          "CORS é uma política que o servidor declara por cabeçalho. O navegador só aplica a regra. Não dá para 'consertar CORS' pelo front.",
      },
    ],
    prerequisites: ["primeira-pr"],
  },
  {
    id: "javascript-moderno",
    order: 100,
    trackId: "core",
    phaseId: "fundamentos",
    title: "JavaScript moderno",
    summary: "Métodos de array, assincronismo e módulos — o JS que a gente escreve de verdade.",
    goal: "Escrever JavaScript idiomático com `map`, `filter`, `reduce`, `async/await` e módulos ES.",
    whyHere:
      "Front e back aqui são JavaScript. Este é o módulo que mais devolve tempo: tudo depois dele fica mais fácil.",
    estimatedHours: 25,
    resources: [
      {
        label: "Formação JavaScript",
        url: "https://www.alura.com.br/formacao-javascript",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 1800,
      },
      {
        label: "JavaScript Algorithms and Data Structures",
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
        kind: "curso",
        source: "freeCodeCamp",
        certificate: true,
        minutes: 1500,
      },
      {
        label: "Guia de JavaScript",
        url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide",
        kind: "doc",
        source: "MDN",
      },
      {
        label: "The Modern JavaScript Tutorial",
        url: "https://javascript.info/",
        kind: "curso",
        source: "javascript.info",
        minutes: 1200,
      },
    ],
    exercise: {
      title: "Transforme dados sem um único `for`",
      description:
        "Pegue um JSON de exemplo com uma lista de pedidos e responda três perguntas usando só métodos de array.",
      steps: [
        "Filtre os pedidos do último mês.",
        "Agrupe por cliente e some o valor total.",
        "Ordene do maior para o menor e pegue os cinco primeiros.",
        "Depois, busque os dados de uma API real com `async/await` e trate o erro.",
      ],
      snippet: {
        language: "javascript",
        code: "const topClientes = Object.entries(\n  pedidos\n    .filter((p) => p.data >= inicioDoMes)\n    .reduce((acc, p) => {\n      acc[p.cliente] = (acc[p.cliente] ?? 0) + p.valor;\n      return acc;\n    }, {}),\n)\n  .sort((a, b) => b[1] - a[1])\n  .slice(0, 5);",
      },
    },
    doneWhen: [
      "Você resolve transformações de lista sem escrever `for`.",
      "Você sabe explicar a diferença entre `null`, `undefined` e valor ausente.",
      "Você trata erro em `async/await` com `try/catch` sem engolir a exceção.",
    ],
    quiz: [
      {
        id: "js-q1",
        question: "Qual a diferença entre `map` e `forEach`?",
        options: [
          "Nenhuma, são sinônimos",
          "`map` retorna um novo array; `forEach` retorna `undefined`",
          "`forEach` é mais rápido",
          "`map` altera o array original",
        ],
        answerIndex: 1,
        explanation:
          "`map` transforma e devolve um array novo. `forEach` existe para efeito colateral e não devolve nada — usar `forEach` esperando retorno é um erro comum.",
      },
      {
        id: "js-q2",
        question: "O que `await` faz dentro de uma função `async`?",
        options: [
          "Trava o navegador até a promessa resolver",
          "Pausa aquela função até a promessa resolver, sem travar o resto",
          "Converte a promessa em callback",
          "Executa a promessa em outra thread",
        ],
        answerIndex: 1,
        explanation:
          "`await` suspende só aquela função. O restante do programa continua rodando — por isso ele não trava a interface.",
      },
    ],
    prerequisites: ["como-a-web-funciona"],
  },
  {
    id: "typescript",
    order: 110,
    trackId: "core",
    phaseId: "fundamentos",
    title: "TypeScript em modo estrito",
    summary: "Tipos que pegam o erro antes do cliente pegar.",
    goal: "Tipar funções, objetos e respostas de API, e ler mensagens de erro do compilador sem se assustar.",
    whyHere:
      "Todo repositório da CLG roda em `strict`. O compilador é a primeira revisão do seu código e ele nunca fica cansado às sete da noite.",
    estimatedHours: 15,
    resources: [
      {
        label: "TypeScript: evoluindo seu JavaScript",
        url: "https://www.alura.com.br/cursos-online-programacao/typescript",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 720,
      },
      {
        label: "TypeScript Handbook",
        url: "https://www.typescriptlang.org/docs/handbook/intro.html",
        kind: "doc",
        source: "TypeScript",
        minutes: 300,
      },
      {
        label: "TypeScript para quem já sabe JavaScript",
        url: "https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html",
        kind: "artigo",
        source: "TypeScript",
        minutes: 30,
      },
    ],
    exercise: {
      title: "Tipe o retorno de uma API sem usar `any`",
      description:
        "Pegue uma resposta real de API do projeto e escreva os tipos dela. A regra é única: nenhum `any`.",
      steps: [
        "Escreva a `interface` da resposta a partir do JSON real.",
        "Trate os campos que podem vir nulos ou ausentes.",
        "Crie uma função que recebe essa resposta e devolve só o que a tela precisa.",
        "Rode `tsc --noEmit` e resolva todos os erros.",
      ],
      snippet: {
        language: "typescript",
        code: "interface Pedido {\n  id: string;\n  cliente: string;\n  valor: number;\n  // a API omite o campo quando o pedido ainda não foi pago\n  pagoEm?: string;\n}\n\nfunction pedidosPendentes(pedidos: Pedido[]): Pedido[] {\n  return pedidos.filter((pedido) => pedido.pagoEm === undefined);\n}",
      },
    },
    doneWhen: [
      "Nenhum `any` no código que você escreveu.",
      "`tsc --noEmit` passa sem erro.",
      "Você consegue ler um erro do compilador e dizer o que ele quer, sem colar no chat.",
    ],
    prerequisites: ["javascript-moderno"],
  },
  {
    id: "git-fluxo",
    order: 120,
    trackId: "core",
    phaseId: "fundamentos",
    title: "Git no fluxo do time",
    summary: "Branch, rebase, conflito e revisão — sem medo de perder trabalho.",
    goal: "Trabalhar em paralelo com o time, resolver conflitos e manter o histórico legível.",
    whyHere:
      "Somos quatro pessoas mexendo nos mesmos repositórios. Conflito não é acidente, é rotina — e quem sabe resolver não trava a entrega de mais ninguém.",
    estimatedHours: 10,
    resources: [
      {
        label: "Git e GitHub: estratégias de ramificação",
        url: "https://www.alura.com.br/cursos-online-programacao/git",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 480,
      },
      {
        label: "Pro Git — leia o capítulo 3, sobre ramificação",
        url: "https://git-scm.com/book/pt-br/v2",
        kind: "livro",
        source: "Git",
        minutes: 90,
      },
      {
        label: "Learn Git Branching — visual e interativo",
        url: "https://learngitbranching.js.org/?locale=pt_BR",
        kind: "ferramenta",
        source: "Learn Git Branching",
        minutes: 180,
      },
      {
        label: "Conventional Commits",
        url: "https://www.conventionalcommits.org/pt-br/v1.0.0/",
        kind: "doc",
        source: "Conventional Commits",
        minutes: 20,
      },
      {
        label: "Convenção de branches e commits da CLG",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
    ],
    exercise: {
      title: "Provoque um conflito e resolva",
      description:
        "Conflito assusta porque a maioria só encontra o primeiro em produção, com pressa. Crie um de propósito, sem pressa.",
      steps: [
        "Crie duas branches que alteram a mesma linha do mesmo arquivo.",
        "Mergeie a primeira e depois tente mergear a segunda.",
        "Resolva o conflito lendo os dois lados, não apagando um deles.",
        "Refaça o exercício usando `rebase` no lugar de `merge` e compare o histórico.",
      ],
      snippet: {
        language: "bash",
        code: "git log --oneline --graph --all   # veja o histórico como árvore\ngit rebase main                   # traz sua branch para cima da main\ngit rebase --abort                # desiste sem perder nada",
      },
    },
    doneWhen: [
      "Você resolveu um conflito sem apagar o trabalho de outra pessoa.",
      "Suas mensagens de commit seguem a convenção do time.",
      "Você sabe como desfazer um rebase que deu errado.",
    ],
    quiz: [
      {
        id: "git-q1",
        question: "Você commitou na branch errada. O que fazer?",
        options: [
          "Apagar o repositório e clonar de novo",
          "Levar o commit para a branch certa com `git cherry-pick` ou `git reset`",
          "Deixar como está, alguém resolve depois",
          "Fazer `git push --force` na main",
        ],
        answerIndex: 1,
        explanation:
          "Quase nada no Git é irreversível. `cherry-pick` copia o commit para a branch certa; `reset` remove daqui. `push --force` na main é o único caminho que causa dano real.",
      },
    ],
    prerequisites: ["primeira-pr"],
  },
];
