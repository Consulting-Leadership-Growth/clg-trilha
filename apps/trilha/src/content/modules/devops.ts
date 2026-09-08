import type { Module } from "../types";

/** Trilha de DevOps: fundamentos próprios (dias 6–30) e especialização (31–60). */
export const devopsModules: Module[] = [
  {
    id: "docker-usuario",
    order: 140,
    trackId: "devops",
    paths: ["back", "devops"],
    phaseId: "fundamentos",
    title: "Docker como usuário",
    summary: "Subir o ambiente do projeto inteiro sem instalar banco na sua máquina.",
    goal: "Usar `docker compose` para subir, parar e depurar os serviços de um projeto.",
    whyHere:
      "Nossos projetos sobem com um comando. Você não precisa saber construir imagem ainda — precisa conseguir rodar o ambiente e ler o log quando ele não sobe.",
    estimatedHours: 6,
    resources: [
      {
        label: "Docker: criando e gerenciando containers",
        url: "https://www.alura.com.br/cursos-online-devops/docker",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 480,
      },
      {
        label: "Docker — guia de introdução",
        url: "https://docs.docker.com/get-started/",
        kind: "doc",
        source: "Docker",
        minutes: 120,
      },
      {
        label: "Referência do Docker Compose",
        url: "https://docs.docker.com/compose/",
        kind: "doc",
        source: "Docker",
      },
    ],
    exercise: {
      title: "Suba, quebre e conserte o ambiente",
      description:
        "Rode o compose de um projeto do time, entre nos containers e provoque falhas para aprender a diagnosticar.",
      steps: [
        "Suba todos os serviços e confirme que a aplicação responde.",
        "Leia os logs de cada serviço separadamente.",
        "Entre no container do banco e liste as tabelas.",
        "Mude a porta no `.env` de propósito, veja o erro e conserte.",
      ],
      snippet: {
        language: "bash",
        code: "docker compose up -d          # sobe em segundo plano\ndocker compose ps            # o que está rodando\ndocker compose logs -f api   # acompanha o log da api\ndocker compose exec db psql -U postgres\ndocker compose down          # derruba tudo",
      },
    },
    doneWhen: [
      "Você sobe o ambiente do projeto sozinho, do zero.",
      "Você sabe ler o log de um serviço específico.",
      "Você entra num container em execução para investigar.",
    ],
    prerequisites: ["terminal"],
  },
  {
    id: "git-avancado",
    order: 360,
    trackId: "devops",
    phaseId: "especializacao",
    title: "Estratégia de branches e versionamento",
    summary: "Como o código caminha da sua máquina até a produção.",
    goal: "Trabalhar dentro da estratégia de branches do time e versionar entregas com tags.",
    whyHere:
      "Com quatro pessoas em repositórios compartilhados, a estratégia de branch é o que decide se dá para publicar numa quinta-feira sem susto.",
    estimatedHours: 6,
    resources: [
      {
        label: "GitHub Flow",
        url: "https://docs.github.com/pt/get-started/using-github/github-flow",
        kind: "doc",
        source: "GitHub",
        minutes: 30,
      },
      {
        label: "Trunk Based Development",
        url: "https://trunkbaseddevelopment.com/",
        kind: "artigo",
        source: "Trunk Based Development",
        minutes: 60,
      },
      {
        label: "Versionamento Semântico",
        url: "https://semver.org/lang/pt-BR/",
        kind: "doc",
        source: "SemVer",
        minutes: 20,
      },
      {
        label: "Estratégia de branches adotada pela CLG",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
    ],
    exercise: {
      title: "Simule um ciclo de release",
      description:
        "Em um repositório de estudo, percorra o caminho completo: feature, revisão, merge, tag e nota de versão.",
      steps: [
        "Abra duas features em paralelo, em branches separadas.",
        "Mergeie uma e atualize a outra a partir da main.",
        "Crie uma tag seguindo versionamento semântico.",
        "Escreva a nota de versão dizendo o que mudou para quem usa.",
      ],
      snippet: {
        language: "bash",
        code: 'git tag -a v1.2.0 -m "Adiciona exportação de relatório"\ngit push origin v1.2.0',
      },
    },
    doneWhen: [
      "Você sabe qual branch é a fonte da verdade e o que pode ir direto nela.",
      "Você criou uma tag e sabe explicar o que muda entre maior, menor e correção.",
      "Você atualizou uma branch antiga a partir da main sem quebrar nada.",
    ],
    prerequisites: ["git-fluxo"],
  },
  {
    id: "dockerfile",
    order: 370,
    trackId: "devops",
    phaseId: "especializacao",
    title: "Escrevendo um Dockerfile",
    summary: "Sair de usuário de container para autor de imagem.",
    goal: "Escrever um Dockerfile multi-estágio que gera uma imagem pequena e reprodutível.",
    whyHere:
      "A imagem é o que roda em produção. Imagem de 2 GB deixa o deploy lento e a superfície de ataque grande — e o ajuste é quase sempre simples.",
    estimatedHours: 10,
    resources: [
      {
        label: "Referência do Dockerfile",
        url: "https://docs.docker.com/reference/dockerfile/",
        kind: "doc",
        source: "Docker",
        minutes: 120,
      },
      {
        label: "Boas práticas para escrever Dockerfile",
        url: "https://docs.docker.com/build/building/best-practices/",
        kind: "artigo",
        source: "Docker",
        minutes: 60,
      },
      {
        label: "Docker: criando containers sem dor de cabeça",
        url: "https://www.alura.com.br/cursos-online-devops/docker",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 480,
      },
    ],
    exercise: {
      title: "Reduza uma imagem pela metade",
      description:
        "Escreva um Dockerfile ingênuo, meça o tamanho, depois aplique multi-estágio e compare.",
      steps: [
        "Construa a versão ingênua e anote o tamanho com `docker images`.",
        "Separe em estágio de build e estágio de execução.",
        "Adicione um `.dockerignore` cobrindo `node_modules` e `.git`.",
        "Reordene as instruções para aproveitar o cache de camadas.",
      ],
      snippet: {
        language: "dockerfile",
        code: "FROM node:22-alpine AS build\nWORKDIR /app\n# Copiar só o manifesto primeiro aproveita o cache:\n# a camada de dependências só refaz quando o package.json muda.\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-alpine\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=build /app/dist ./dist\nCOPY --from=build /app/node_modules ./node_modules\nUSER node\nCMD [\"node\", \"dist/main.js\"]",
      },
    },
    doneWhen: [
      "A imagem final não contém ferramentas de build.",
      "Mudar uma linha de código não refaz a instalação de dependências.",
      "O container não roda como root.",
    ],
    quiz: [
      {
        id: "devops-q1",
        question: "Por que copiar `package.json` antes do resto do código?",
        options: [
          "Porque o Docker exige essa ordem",
          "Para que a camada de dependências use cache enquanto o manifesto não mudar",
          "Para reduzir o tamanho final da imagem",
          "Não faz diferença",
        ],
        answerIndex: 1,
        explanation:
          "Cada instrução vira uma camada em cache. Copiando o código depois, alterar um arquivo não invalida a camada de `npm ci` — o build cai de minutos para segundos.",
      },
    ],
    prerequisites: ["docker-usuario"],
  },
  {
    id: "compose-ambiente",
    order: 380,
    trackId: "devops",
    phaseId: "especializacao",
    title: "Compose: o ambiente inteiro em um arquivo",
    summary: "Aplicação, banco e serviços auxiliares subindo juntos, iguais para todo mundo.",
    goal: "Escrever um `compose.yaml` que sobe o ambiente completo de um projeto do zero.",
    whyHere:
      "Um ambiente que sobe com um comando é o que faz alguém novo produzir no primeiro dia em vez de no terceiro.",
    estimatedHours: 8,
    resources: [
      {
        label: "Docker Compose — documentação",
        url: "https://docs.docker.com/compose/",
        kind: "doc",
        source: "Docker",
        minutes: 150,
      },
      {
        label: "Referência do arquivo Compose",
        url: "https://docs.docker.com/reference/compose-file/",
        kind: "doc",
        source: "Docker",
      },
    ],
    exercise: {
      title: "Ambiente completo em um comando",
      description:
        "Monte um compose com aplicação e banco, com dado persistente e ordem de inicialização correta.",
      steps: [
        "Declare os serviços de aplicação e de banco.",
        "Use volume nomeado para o banco não perder dado ao derrubar.",
        "Adicione verificação de saúde no banco e faça a aplicação esperar por ela.",
        "Documente no README como subir, em duas linhas.",
      ],
      snippet: {
        language: "yaml",
        code: "services:\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}\n    volumes:\n      - dados:/var/lib/postgresql/data\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n      interval: 5s\n      retries: 5\n\n  api:\n    build: .\n    depends_on:\n      db:\n        condition: service_healthy\n    ports:\n      - \"3000:3000\"\n\nvolumes:\n  dados:",
      },
    },
    doneWhen: [
      "`docker compose up` sobe tudo funcionando, em máquina limpa.",
      "Derrubar e subir de novo preserva os dados do banco.",
      "Nenhuma senha está cravada no arquivo versionado.",
    ],
    prerequisites: ["dockerfile"],
  },
  {
    id: "github-actions",
    order: 390,
    trackId: "devops",
    phaseId: "especializacao",
    title: "GitHub Actions",
    summary: "Automatizar o que hoje alguém lembra de fazer na mão.",
    goal: "Escrever um workflow que roda a cada Pull Request e reporta o resultado nela.",
    whyHere:
      "Revisão humana deve discutir decisão de código, não apontar que faltou rodar o lint. A esteira cuida do mecânico.",
    estimatedHours: 10,
    resources: [
      {
        label: "GitHub Actions — documentação em português",
        url: "https://docs.github.com/pt/actions",
        kind: "doc",
        source: "GitHub",
        minutes: 240,
      },
      {
        label: "Sintaxe de workflow",
        url: "https://docs.github.com/pt/actions/writing-workflows/workflow-syntax-for-github-actions",
        kind: "doc",
        source: "GitHub",
      },
      {
        label: "Integração contínua na prática",
        url: "https://www.alura.com.br/cursos-online-devops",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 600,
      },
    ],
    exercise: {
      title: "Sua primeira esteira",
      description:
        "Crie um workflow que valida cada PR. O arquivo `.github/workflows/ci.yml` deste repositório serve de referência.",
      steps: [
        "Dispare o workflow em `pull_request`.",
        "Instale dependências com cache.",
        "Rode verificação de tipos, lint e testes.",
        "Faça o workflow falhar de propósito e confirme que a PR fica bloqueada.",
      ],
      snippet: {
        language: "yaml",
        code: "name: CI\non:\n  pull_request:\n\njobs:\n  verificar:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm\n      - run: npm ci\n      - run: npm run typecheck\n      - run: npm test --if-present",
      },
    },
    doneWhen: [
      "O workflow roda automaticamente ao abrir uma PR.",
      "Erro de tipo ou teste quebrado impede o merge.",
      "O tempo total da esteira fica abaixo de cinco minutos.",
    ],
    prerequisites: ["git-avancado"],
  },
  {
    id: "pipeline-qualidade",
    order: 400,
    trackId: "devops",
    phaseId: "especializacao",
    title: "Esteira de qualidade",
    summary: "Lint, tipos, testes e build — tudo que roda antes de alguém revisar.",
    goal: "Montar uma esteira completa e configurar as verificações obrigatórias antes do merge.",
    whyHere:
      "Padrão de código combinado e não automatizado vira discussão em toda revisão. Automatizado, para de ser assunto.",
    estimatedHours: 8,
    resources: [
      {
        label: "ESLint — comece por aqui",
        url: "https://eslint.org/docs/latest/use/getting-started",
        kind: "doc",
        source: "ESLint",
        minutes: 60,
      },
      {
        label: "Prettier — documentação",
        url: "https://prettier.io/docs/",
        kind: "doc",
        source: "Prettier",
        minutes: 45,
      },
      {
        label: "Proteção de branch no GitHub",
        url: "https://docs.github.com/pt/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches",
        kind: "doc",
        source: "GitHub",
        minutes: 30,
      },
    ],
    exercise: {
      title: "Deixe a esteira ser a chata",
      description:
        "Configure as ferramentas e proteja a branch principal para que nada entre sem passar.",
      steps: [
        "Configure lint e formatação com as regras do time.",
        "Adicione as verificações ao workflow de CI.",
        "Marque as verificações como obrigatórias na proteção da branch.",
        "Abra uma PR quebrando uma regra de propósito e veja o bloqueio funcionando.",
      ],
    },
    doneWhen: [
      "A main não aceita merge com a esteira vermelha.",
      "Formatação não é mais assunto em revisão.",
      "Rodar a verificação localmente dá o mesmo resultado da esteira.",
    ],
    prerequisites: ["github-actions"],
  },
  {
    id: "deploy-ambientes",
    order: 420,
    trackId: "devops",
    phaseId: "especializacao",
    title: "Deploy, segredos e rollback",
    summary: "Publicar é fácil. Voltar atrás com segurança é o que importa.",
    goal: "Publicar uma aplicação, gerenciar segredos por ambiente e reverter uma versão ruim.",
    whyHere:
      "Todo mundo publica algo quebrado uma vez. A diferença entre um susto e um incidente é saber reverter em minutos.",
    estimatedHours: 12,
    resources: [
      {
        label: "Segredos criptografados no GitHub Actions",
        url: "https://docs.github.com/pt/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets",
        kind: "doc",
        source: "GitHub",
        minutes: 45,
      },
      {
        label: "The Twelve-Factor App (em português)",
        url: "https://12factor.net/pt_br/",
        kind: "artigo",
        source: "12factor",
        minutes: 90,
      },
      {
        label: "Documentação da Vercel",
        url: "https://vercel.com/docs",
        kind: "doc",
        source: "Vercel",
        minutes: 60,
      },
      {
        label: "Onde a CLG hospeda cada projeto e quem tem acesso",
        url: "",
        kind: "doc",
        internal: true,
        source: "CLG",
      },
    ],
    exercise: {
      title: "Publique, quebre e reverta",
      description:
        "O exercício só está completo quando você tiver revertido uma versão — de propósito, cronometrando.",
      steps: [
        "Publique uma aplicação em ambiente de homologação pela esteira.",
        "Configure os segredos por ambiente, sem nada no repositório.",
        "Publique uma versão quebrada de propósito.",
        "Reverta e anote quanto tempo levou do erro até a correção.",
      ],
    },
    doneWhen: [
      "Nenhum segredo aparece no repositório ou no log da esteira.",
      "Você reverteu uma versão e sabe quanto tempo isso leva.",
      "Homologação e produção usam configuração separada.",
    ],
    quiz: [
      {
        id: "devops-q2",
        question: "Onde guardar a senha do banco de produção?",
        options: [
          "No `.env` versionado, para o time todo ter",
          "Cravada no código, é mais simples",
          "Nos segredos do ambiente, injetada como variável na execução",
          "Numa planilha compartilhada",
        ],
        answerIndex: 2,
        explanation:
          "Segredo vive fora do repositório e entra como variável de ambiente. Uma vez commitado, ele fica no histórico do Git para sempre — mesmo depois de apagado do arquivo.",
      },
    ],
    prerequisites: ["pipeline-qualidade"],
  },
  {
    id: "linux-rede",
    order: 130,
    trackId: "devops",
    phaseId: "fundamentos",
    title: "Linux e rede para desenvolvedor",
    summary: "Permissão, processo, DNS e HTTPS — o chão que falta em quem nunca administrou nada.",
    goal: "Trabalhar num servidor Linux e diagnosticar problema de rede sem depender de tentativa e erro.",
    whyHere:
      "Tudo que a gente publica roda em Linux. Quem não sabe ler permissão de arquivo nem descobrir por que um domínio não resolve fica bloqueado no primeiro incidente.",
    estimatedHours: 12,
    resources: [
      {
        label: "Linux: conhecendo e utilizando o terminal",
        url: "https://www.alura.com.br/cursos-online-devops",
        kind: "curso",
        source: "Alura",
        certificate: true,
        minutes: 600,
      },
      {
        label: "Introdução ao Linux",
        url: "https://labex.io/linuxjourney",
        kind: "curso",
        source: "Linux Journey / LabEx",
        minutes: 480,
      },
      {
        label: "O que é um nome de domínio",
        url: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name",
        kind: "doc",
        source: "MDN",
        minutes: 20,
      },
      {
        label: "HTTPS e certificados, explicados",
        url: "https://letsencrypt.org/pt-br/how-it-works/",
        kind: "artigo",
        source: "Let's Encrypt",
        minutes: 30,
      },
    ],
    exercise: {
      title: "Investigue um domínio de ponta a ponta",
      description:
        "Escolha um domínio da CLG e descubra tudo sobre ele pela linha de comando, sem abrir o navegador.",
      steps: [
        "Descubra para qual IP o domínio resolve.",
        "Verifique se a porta 443 está respondendo.",
        "Veja quando o certificado HTTPS expira e quem o emitiu.",
        "Num container Linux, crie um arquivo e mude suas permissões até entender `rwx`.",
      ],
      snippet: {
        language: "bash",
        code: "nslookup exemplo.com.br          # para qual IP o domínio aponta\ncurl -I https://exemplo.com.br   # só os cabeçalhos da resposta\nchmod 644 arquivo.txt            # dono lê e escreve, o resto só lê\nls -la                           # confira o resultado na primeira coluna\nps aux | grep node               # quais processos node estão rodando",
      },
    },
    doneWhen: [
      "Você lê `-rw-r--r--` e diz quem pode fazer o quê.",
      "Você descobre o IP de um domínio e se a porta responde, pelo terminal.",
      "Você sabe por que um certificado vencido derruba o site inteiro.",
    ],
    quiz: [
      {
        id: "devops-q3",
        question: "O site abre pelo IP mas não pelo domínio. Onde está o problema?",
        options: [
          "No certificado HTTPS",
          "Na resolução de DNS: o domínio não aponta para o servidor certo",
          "No código da aplicação",
          "No firewall do servidor",
        ],
        answerIndex: 1,
        explanation:
          "Se o IP responde, o servidor e a aplicação estão de pé. O que falha é a tradução do nome para o endereço — ou seja, o registro DNS.",
      },
    ],
    prerequisites: ["terminal"],
  },
  {
    id: "ambientes-config",
    order: 410,
    trackId: "devops",
    phaseId: "especializacao",
    title: "Configuração e ambientes",
    summary: "O mesmo artefato rodando em homologação e em produção, mudando só a configuração.",
    goal: "Separar código de configuração e manter ambientes que se comportam igual.",
    whyHere:
      "'Na minha máquina funciona' quase sempre é diferença de configuração, não de código. Resolver isso é o que torna o deploy previsível.",
    estimatedHours: 8,
    resources: [
      {
        label: "The Twelve-Factor App (em português)",
        url: "https://12factor.net/pt_br/",
        kind: "artigo",
        source: "12factor",
        minutes: 90,
      },
      {
        label: "Ambientes de deployment no GitHub",
        url: "https://docs.github.com/pt/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments",
        kind: "doc",
        source: "GitHub",
        minutes: 40,
      },
      {
        label: "Onde a CLG hospeda cada projeto e quem tem acesso",
        url: "",
        kind: "ferramenta",
        internal: true,
        source: "CLG",
      },
    ],
    exercise: {
      title: "Um build, dois ambientes",
      description:
        "Construa a imagem uma única vez e faça o mesmo artefato rodar em homologação e em produção só trocando variável.",
      steps: [
        "Liste tudo que muda entre os ambientes — cada item vira variável.",
        "Garanta que nenhum desses valores esteja no repositório.",
        "Escreva um `.env.example` documentando cada variável e para que serve.",
        "Faça a aplicação falhar na inicialização se uma variável obrigatória faltar.",
      ],
    },
    doneWhen: [
      "O mesmo artefato roda nos dois ambientes sem reconstruir.",
      "Existe `.env.example` versionado e nenhum `.env` real no Git.",
      "Variável obrigatória ausente derruba a aplicação com mensagem clara.",
    ],
    prerequisites: ["compose-ambiente"],
  },
  {
    id: "observabilidade",
    order: 430,
    trackId: "devops",
    phaseId: "especializacao",
    title: "Observabilidade: log, métrica e alerta",
    summary: "Descobrir que quebrou antes do cliente ligar.",
    goal: "Instrumentar uma aplicação com log estruturado e alerta que dispara quando algo importante falha.",
    whyHere:
      "Publicar sem observar é dirigir de olhos fechados. O objetivo não é ter painel bonito: é você saber do incidente antes de o cliente saber.",
    estimatedHours: 10,
    resources: [
      {
        label: "Logs estruturados: por que JSON e não texto",
        url: "https://www.elastic.co/blog/structured-logging-filebeat",
        kind: "artigo",
        source: "Elastic",
        minutes: 30,
      },
      {
        label: "Sentry — captura de erro em produção",
        url: "https://docs.sentry.io/",
        kind: "doc",
        source: "Sentry",
        minutes: 90,
      },
      {
        label: "Os quatro sinais de ouro",
        url: "https://sre.google/sre-book/monitoring-distributed-systems/",
        kind: "livro",
        source: "Google SRE",
        minutes: 60,
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
      title: "Descubra a falha antes do cliente",
      description:
        "Instrumente uma aplicação, quebre de propósito e cronometre quanto tempo levou até você ficar sabendo.",
      steps: [
        "Troque `console.log` solto por log estruturado com nível e contexto.",
        "Adicione um identificador de requisição que atravessa todas as camadas.",
        "Conecte captura de erro e provoque uma exceção em homologação.",
        "Configure um alerta e meça o tempo entre a falha e a notificação.",
      ],
      snippet: {
        language: "typescript",
        code: '// Log estruturado é pesquisável; frase solta não é.\n// Com requestId dá para reconstruir uma requisição inteira depois.\nlogger.error({\n  evento: "pagamento_recusado",\n  requestId: request.id,\n  pedidoId: pedido.id,\n  motivo: erro.code,\n}, "Pagamento recusado pelo provedor");',
      },
    },
    doneWhen: [
      "Nenhum log importante é frase solta sem contexto.",
      "Você reconstrói o caminho de uma requisição pelos logs.",
      "Um erro em produção gera notificação sem ninguém precisar olhar.",
    ],
    quiz: [
      {
        id: "devops-q4",
        question: "Por que log estruturado em vez de `console.log` com texto?",
        options: [
          "Ocupa menos espaço",
          "Porque dá para filtrar e agregar por campo, em vez de caçar por substring",
          "É mais rápido",
          "É exigência do Docker",
        ],
        answerIndex: 1,
        explanation:
          "Com campos você pergunta 'todos os erros deste cliente na última hora'. Com texto corrido você só consegue procurar substring e torcer para o formato ter sido consistente.",
      },
    ],
    prerequisites: ["deploy-ambientes"],
  },
  {
    id: "seguranca-esteira",
    order: 440,
    trackId: "devops",
    phaseId: "especializacao",
    title: "Segurança na esteira",
    summary: "Segredo vazado e dependência vulnerável — os dois vetores mais comuns e mais evitáveis.",
    goal: "Impedir que segredo entre no repositório e manter as dependências sob vigilância automática.",
    whyHere:
      "Chave commitada fica no histórico do Git para sempre, mesmo apagada do arquivo depois. É o tipo de erro que a esteira previne de graça e que sai caro quando passa.",
    estimatedHours: 8,
    resources: [
      {
        label: "Dependabot — atualização automática de dependências",
        url: "https://docs.github.com/pt/code-security/dependabot",
        kind: "doc",
        source: "GitHub",
        minutes: 45,
      },
      {
        label: "Varredura de segredos no GitHub",
        url: "https://docs.github.com/pt/code-security/secret-scanning",
        kind: "doc",
        source: "GitHub",
        minutes: 30,
      },
      {
        label: "OWASP Top 10",
        url: "https://owasp.org/www-project-top-ten/",
        kind: "artigo",
        source: "OWASP",
        minutes: 90,
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
      title: "Feche as duas portas mais óbvias",
      description:
        "Configure as proteções e depois tente burlá-las de propósito, para confirmar que funcionam.",
      steps: [
        "Ative a varredura de segredos e o Dependabot no repositório.",
        "Rode `npm audit` e resolva ou justifique cada alerta.",
        "Tente commitar uma chave falsa e confirme que algo te barra.",
        "Documente o que fazer se um segredo real vazar — a resposta começa com 'revogue'.",
      ],
      snippet: {
        language: "bash",
        code: "npm audit --omit=dev     # vulnerabilidades no que vai para produção\nnpm audit fix            # corrige o que dá sem quebrar a API\ngit log -p | grep -i -E 'api[_-]?key|secret|password'   # já vazou algo?",
      },
    },
    doneWhen: [
      "A varredura de segredos está ativa no repositório.",
      "`npm audit` não tem alerta alto sem justificativa escrita.",
      "Você sabe que o primeiro passo diante de um vazamento é revogar, não apagar o commit.",
    ],
    quiz: [
      {
        id: "devops-q5",
        question: "Você commitou uma chave de API e já deu push. Qual o primeiro passo?",
        options: [
          "Apagar a linha e commitar de novo",
          "Revogar a chave imediatamente — ela já está no histórico e pode ter sido lida",
          "Reescrever o histórico com force push",
          "Deixar quieto se o repositório for privado",
        ],
        answerIndex: 1,
        explanation:
          "Apagar do arquivo não apaga do histórico, e reescrever histórico não desfaz quem já clonou. A chave deve ser considerada comprometida: revogue primeiro, limpe o histórico depois.",
      },
    ],
    prerequisites: ["pipeline-qualidade"],
  },
];
