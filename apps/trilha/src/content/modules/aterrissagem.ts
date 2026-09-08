import type { Module } from "../types";

/** Fase 0 — dias 1 a 5. Tirar o dev do estado de "perdido". */
export const aterrissagemModules: Module[] = [
  {
    id: "boas-vindas",
    order: 10,
    trackId: "core",
    phaseId: "aterrissagem",
    title: "Bem-vindo à CLG",
    summary: "Quem somos, o que entregamos e onde você entra nisso.",
    goal: "Explicar, com suas palavras, o que a CLG faz, quem são os clientes e qual o papel do time de tecnologia.",
    whyHere:
      "Código sem contexto vira tarefa. Saber para quem a gente constrói muda as decisões que você toma sozinho no dia a dia — e você vai tomar muitas.",
    estimatedHours: 2,
    resources: [
      {
        label: "Apresentação institucional da CLG",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
      {
        label: "Organograma e quem procurar para cada assunto",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
      {
        label: "Repositórios ativos do time",
        url: "",
        kind: "ferramenta",
        internal: true,
        source: "GitHub",
      },
    ],
    exercise: {
      title: "Escreva o seu resumo da empresa",
      description:
        "Depois de conversar com o time, escreva um parágrafo respondendo: o que a CLG vende, para quem, e como o software que a gente escreve participa disso.",
      steps: [
        "Converse 30 minutos com o seu mentor sobre os produtos ativos.",
        "Anote as três dúvidas que você não conseguiu responder sozinho.",
        "Escreva o parágrafo e mande no canal do time.",
      ],
    },
    doneWhen: [
      "Você consegue nomear os produtos ativos e quem usa cada um.",
      "Você sabe a quem perguntar sobre produto, sobre infra e sobre design.",
      "O parágrafo foi enviado e comentado pelo mentor.",
    ],
    prerequisites: [],
  },
  {
    id: "ambiente-acessos",
    order: 20,
    trackId: "core",
    phaseId: "aterrissagem",
    title: "Máquina pronta e acessos liberados",
    summary: "Node, Git, editor, Docker e as contas que você vai usar todo dia.",
    goal: "Ter um ambiente de desenvolvimento funcionando e conseguir rodar um projeto do time localmente.",
    whyHere:
      "Ambiente quebrado consome semanas de forma invisível. Resolver isso no dia 1, com alguém do lado, custa uma tarde. Sozinho no dia 40, custa muito mais.",
    estimatedHours: 4,
    resources: [
      {
        label: "Instalar o Node.js (use a versão LTS)",
        url: "https://nodejs.org/pt-br/download",
        kind: "ferramenta",
        source: "Node.js",
      },
      {
        label: "Instalar o Git",
        url: "https://git-scm.com/downloads",
        kind: "ferramenta",
        source: "Git",
      },
      {
        label: "Visual Studio Code",
        url: "https://code.visualstudio.com/",
        kind: "ferramenta",
        source: "Microsoft",
      },
      {
        label: "Docker Desktop",
        url: "https://www.docker.com/products/docker-desktop/",
        kind: "ferramenta",
        source: "Docker",
      },
      {
        label: "Checklist de acessos da CLG (e-mail, GitHub, VPN, senhas)",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
    ],
    exercise: {
      title: "Rode um projeto do time do zero",
      description:
        "Clone o repositório que o seu mentor indicar, instale as dependências e suba o projeto localmente. Anote cada erro que apareceu e como resolveu.",
      steps: [
        "Confirme as versões instaladas com os comandos abaixo.",
        "Clone o repositório indicado pelo mentor.",
        "Instale as dependências e suba o projeto.",
        "Documente no canal do time qualquer passo que faltava no README.",
      ],
      snippet: {
        language: "bash",
        code: "node --version\nnpm --version\ngit --version\ndocker --version",
      },
    },
    doneWhen: [
      "Os quatro comandos de versão respondem sem erro.",
      "Você abriu o projeto do time no navegador, rodando na sua máquina.",
      "Você tem acesso ao GitHub da CLG e consegue clonar um repositório privado.",
    ],
    prerequisites: ["boas-vindas"],
  },
  {
    id: "terminal",
    order: 30,
    trackId: "core",
    phaseId: "aterrissagem",
    title: "Terminal sem medo",
    summary: "Navegar, mover arquivos, ler saída de comando e não travar quando algo dá errado.",
    goal: "Usar o terminal com naturalidade para navegar, rodar scripts e ler mensagens de erro.",
    whyHere:
      "Praticamente tudo que a gente faz passa pelo terminal: instalar, rodar, testar, publicar. Quem tem medo dele fica dependente de alguém para qualquer coisa.",
    estimatedHours: 5,
    resources: [
      {
        label: "Curso de Linux I: conhecendo e utilizando o terminal",
        url: "https://www.alura.com.br/cursos-online-infraestrutura",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 480,
      },
      {
        label: "Introdução à linha de comando (em inglês)",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line",
        kind: "doc",
        source: "MDN",
        minutes: 60,
      },
      {
        label: "The Missing Semester — o que a faculdade não ensina sobre terminal",
        url: "https://missing.csail.mit.edu/",
        kind: "curso",
        source: "MIT",
        minutes: 300,
      },
    ],
    exercise: {
      title: "Um dia inteiro só no terminal",
      description:
        "Passe uma tarde sem usar o explorador de arquivos. Crie pastas, mova arquivos, leia conteúdo e rode os scripts do projeto apenas pela linha de comando.",
      steps: [
        "Crie uma pasta de estudos e navegue até ela sem o mouse.",
        "Crie, renomeie, mova e apague arquivos pelo terminal.",
        "Descubra o que cada comando abaixo faz antes de rodar.",
        "Provoque um erro de propósito e leia a mensagem inteira antes de pesquisar.",
      ],
      snippet: {
        language: "bash",
        code: "pwd          # onde eu estou\nls -la       # o que tem aqui, incluindo arquivos ocultos\ncd ..        # sobe um nível\nmkdir -p a/b # cria pasta e subpasta de uma vez\ncat arquivo  # imprime o conteúdo\ngrep -r erro # procura 'erro' em tudo abaixo daqui",
      },
    },
    doneWhen: [
      "Você navega entre pastas sem pensar nos comandos.",
      "Você lê uma mensagem de erro inteira antes de pedir ajuda.",
      "Você consegue rodar os scripts do projeto sem consultar anotação.",
    ],
    quiz: [
      {
        id: "terminal-q1",
        question: "O que `cd ..` faz?",
        options: [
          "Apaga a pasta atual",
          "Sobe um nível na árvore de pastas",
          "Volta para a pasta do usuário",
          "Lista os arquivos ocultos",
        ],
        answerIndex: 1,
        explanation:
          "`..` sempre se refere à pasta acima da atual. Para ir direto à pasta do usuário, use `cd ~`.",
      },
      {
        id: "terminal-q2",
        question: "Um comando falhou e imprimiu 15 linhas. Qual é o primeiro passo?",
        options: [
          "Rodar de novo, às vezes funciona",
          "Chamar alguém do time imediatamente",
          "Ler a saída inteira procurando a linha que nomeia o erro",
          "Apagar node_modules e instalar tudo de novo",
        ],
        answerIndex: 2,
        explanation:
          "A resposta quase sempre está na saída. Rodar de novo ou apagar tudo esconde o problema em vez de resolver, e você vai reencontrá-lo depois.",
      },
    ],
    prerequisites: ["ambiente-acessos"],
  },
  {
    id: "primeira-pr",
    order: 40,
    trackId: "core",
    phaseId: "aterrissagem",
    title: "Sua primeira Pull Request",
    summary: "Clone, branch, commit, push e PR — o ciclo que você vai repetir todos os dias.",
    goal: "Abrir uma Pull Request de verdade em um repositório da CLG e levá-la até o merge.",
    whyHere:
      "Toda linha de código que entra em produção na CLG passa por uma PR revisada. Fazer isso na primeira semana, com uma mudança pequena, tira o peso do processo.",
    estimatedHours: 4,
    resources: [
      {
        label: "Git e GitHub: controle e compartilhe seu código",
        url: "https://www.alura.com.br/cursos-online-programacao/git",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 480,
      },
      {
        label: "Pro Git — capítulos 1 e 2, em português",
        url: "https://git-scm.com/book/pt-br/v2",
        kind: "livro",
        source: "Git",
        minutes: 120,
      },
      {
        label: "Sobre Pull Requests",
        url: "https://docs.github.com/pt/pull-requests",
        kind: "doc",
        source: "GitHub",
        minutes: 30,
      },
    ],
    exercise: {
      title: "Adicione seu nome ao README do time",
      description:
        "A mudança é mínima de propósito. O que está sendo exercitado é o ciclo completo, não a complexidade do código.",
      steps: [
        "Crie uma branch com um nome descritivo.",
        "Faça a alteração e um commit com mensagem clara.",
        "Publique a branch e abra a PR descrevendo o que mudou e por quê.",
        "Peça revisão ao seu mentor e aplique os comentários.",
      ],
      snippet: {
        language: "bash",
        code: 'git checkout -b docs/adiciona-nome-fulano\n# edite o README\ngit add README.md\ngit commit -m "docs: adiciona Fulano ao time"\ngit push -u origin docs/adiciona-nome-fulano',
      },
    },
    doneWhen: [
      "A PR foi aberta com título e descrição que explicam a mudança.",
      "Você respondeu aos comentários da revisão em vez de só aplicá-los em silêncio.",
      "A PR foi mergeada e a branch apagada.",
    ],
    prerequisites: ["terminal"],
  },
  {
    id: "pedir-ajuda",
    order: 50,
    trackId: "core",
    phaseId: "aterrissagem",
    title: "Como pedir ajuda",
    summary: "Travar faz parte. Travar em silêncio por três dias, não.",
    goal: "Escrever um pedido de ajuda que a pessoa consiga responder sem precisar de cinco perguntas de volta.",
    whyHere:
      "Somos um time pequeno. Uma pergunta bem escrita custa dois minutos de quem responde; uma pergunta vaga custa meia hora e ainda não resolve.",
    estimatedHours: 1,
    resources: [
      {
        label: "Como fazer uma boa pergunta",
        url: "https://pt.stackoverflow.com/help/how-to-ask",
        kind: "artigo",
        source: "Stack Overflow em Português",
        minutes: 20,
      },
      {
        label: "Como criar um exemplo mínimo e reproduzível",
        url: "https://pt.stackoverflow.com/help/minimal-reproducible-example",
        kind: "artigo",
        source: "Stack Overflow em Português",
        minutes: 15,
      },
      {
        label: "Combinados do time: onde perguntar e tempo de resposta",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
    ],
    exercise: {
      title: "A regra dos 30 minutos",
      description:
        "Combine com o seu mentor: você tenta sozinho por 30 minutos. Passou disso, você pergunta — mas usando o formato abaixo.",
      steps: [
        "Diga o que você está tentando fazer, não só o que quebrou.",
        "Cole a mensagem de erro completa, não um resumo dela.",
        "Liste o que você já tentou.",
        "Diga qual é a sua hipótese, mesmo que esteja errada.",
      ],
      snippet: {
        language: "markdown",
        code: "**Objetivo:** subir a API local para testar a rota de login\n**Erro:** `ECONNREFUSED 127.0.0.1:5432`\n**Já tentei:** reiniciar o container, conferir a porta no .env\n**Hipótese:** o Postgres não subiu junto com o compose",
      },
    },
    doneWhen: [
      "Você pediu ajuda pelo menos uma vez usando o formato acima.",
      "Você deixou de mandar 'não funciona' como pergunta.",
      "Você sabe quanto tempo insistir antes de chamar alguém.",
    ],
    prerequisites: [],
  },
];
