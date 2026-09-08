import type { GlossaryEntry } from "./types";

/**
 * Termos que o time usa sem perceber e que ninguém explica para quem chega.
 * Se você ouviu algo numa reunião e não estava aqui, adicione.
 */
export const glossary: GlossaryEntry[] = [
  {
    term: "PR (Pull Request)",
    definition:
      "Pedido para juntar o seu código ao código principal. É onde o time revisa antes de aceitar. Toda mudança na CLG passa por uma.",
    seeAlso: ["Code review", "Merge", "Branch"],
  },
  {
    term: "Branch",
    definition:
      "Uma linha paralela de desenvolvimento. Você cria uma para trabalhar sem atrapalhar o código principal, e depois junta de volta.",
    seeAlso: ["Merge", "Rebase", "Main"],
  },
  {
    term: "Main",
    definition:
      "A branch principal do repositório, a fonte da verdade. O que está nela deve estar sempre funcionando.",
    seeAlso: ["Branch", "Deploy"],
  },
  {
    term: "Merge",
    definition:
      "Juntar o conteúdo de uma branch em outra. Quando as duas mexeram na mesma linha, dá conflito e alguém precisa decidir qual versão fica.",
    seeAlso: ["Rebase", "Conflito"],
  },
  {
    term: "Rebase",
    definition:
      "Reaplicar seus commits em cima de outra branch, como se você tivesse começado dali. Deixa o histórico linear, mas reescreve commits — nunca faça em branch compartilhada.",
    seeAlso: ["Merge", "Branch"],
  },
  {
    term: "Conflito",
    definition:
      "Quando duas pessoas alteram a mesma linha do mesmo arquivo e o Git não consegue decidir sozinho. Resolver é ler os dois lados e escolher, não apagar um deles.",
    seeAlso: ["Merge", "Rebase"],
  },
  {
    term: "Code review",
    definition:
      "A leitura do seu código por outra pessoa antes do merge. Não é julgamento: é o principal canal de aprendizado do time.",
    seeAlso: ["PR (Pull Request)"],
  },
  {
    term: "Deploy",
    definition:
      "Publicar o código em um ambiente onde ele roda de verdade. Pode ser homologação (para testar) ou produção (onde estão os usuários).",
    seeAlso: ["Produção", "Homologação", "Rollback"],
  },
  {
    term: "Produção",
    definition:
      "O ambiente que os usuários reais acessam. Erro aqui é sentido por gente de verdade — daí todo o cuidado com esteira e rollback.",
    seeAlso: ["Homologação", "Deploy"],
  },
  {
    term: "Homologação",
    definition:
      "Ambiente igual ao de produção, mas com dados de teste. Serve para validar antes de expor a mudança aos usuários. Também chamado de staging.",
    seeAlso: ["Produção", "Deploy"],
  },
  {
    term: "Rollback",
    definition:
      "Voltar para a versão anterior depois de um deploy ruim. Saber reverter rápido importa mais do que nunca errar.",
    seeAlso: ["Deploy", "Produção"],
  },
  {
    term: "CI / CD",
    definition:
      "Integração e entrega contínuas. Na prática: a automação que roda testes a cada PR (CI) e publica quando tudo passa (CD). Na CLG é GitHub Actions.",
    seeAlso: ["Pipeline", "Deploy"],
  },
  {
    term: "Pipeline",
    definition:
      "A sequência de passos automatizados que o código percorre: instalar, verificar tipos, testar, construir, publicar. Também chamada de esteira.",
    seeAlso: ["CI / CD"],
  },
  {
    term: "API",
    definition:
      "O contrato pelo qual dois sistemas conversam. No nosso caso, quase sempre o back-end expondo rotas HTTP que o front consome.",
    seeAlso: ["REST", "Endpoint"],
  },
  {
    term: "REST",
    definition:
      "Estilo de API que usa os métodos do HTTP com significado: GET lê, POST cria, PUT/PATCH atualiza, DELETE remove.",
    seeAlso: ["API", "Endpoint"],
  },
  {
    term: "Endpoint",
    definition:
      "Um endereço específico da API, como `/pedidos/123`. Cada um responde a determinados métodos HTTP.",
    seeAlso: ["API", "REST"],
  },
  {
    term: "ORM",
    definition:
      "Camada que traduz tabelas do banco em objetos do código, evitando escrever SQL na mão. Não dispensa saber SQL — só adia a necessidade.",
    seeAlso: ["Migration", "Postgres"],
  },
  {
    term: "Migration",
    definition:
      "Um arquivo versionado que descreve uma mudança no esquema do banco. Permite aplicar a mesma alteração em toda máquina e ambiente, na mesma ordem.",
    seeAlso: ["ORM", "Postgres"],
  },
  {
    term: "Postgres",
    definition:
      "O banco de dados relacional que a CLG usa. Guarda dados em tabelas com relações declaradas entre elas.",
    seeAlso: ["ORM", "Migration"],
  },
  {
    term: "Container",
    definition:
      "Um pacote isolado com a aplicação e tudo que ela precisa para rodar. Faz o projeto se comportar igual na sua máquina e no servidor.",
    seeAlso: ["Docker", "Imagem"],
  },
  {
    term: "Docker",
    definition:
      "A ferramenta que cria e roda containers. `docker compose up` sobe o ambiente inteiro do projeto de uma vez.",
    seeAlso: ["Container", "Imagem"],
  },
  {
    term: "Imagem",
    definition:
      "O molde a partir do qual containers são criados. Descrita por um Dockerfile e construída uma vez, executada muitas.",
    seeAlso: ["Container", "Docker"],
  },
  {
    term: "Design system",
    definition:
      "O conjunto de tokens, temas e componentes que define como os produtos da CLG se parecem. Usar token em vez de cor solta é regra, não preferência.",
    seeAlso: ["Token"],
  },
  {
    term: "Token",
    definition:
      "Um nome que representa um valor de design — `--primary`, `--border`. Mudar o token muda o produto inteiro de uma vez; hex solto não.",
    seeAlso: ["Design system"],
  },
  {
    term: "Estado (state)",
    definition:
      "Os dados que uma tela guarda enquanto está aberta: o que foi digitado, o que está carregando, o que deu erro. A maior fonte de bug de interface.",
    seeAlso: ["Props"],
  },
  {
    term: "Props",
    definition:
      "Os dados que um componente React recebe de quem o usa. Diferente de estado: props vêm de fora e o componente não as altera.",
    seeAlso: ["Estado (state)"],
  },
  {
    term: "Refatorar",
    definition:
      "Mudar como o código está escrito sem mudar o que ele faz. Se o comportamento mudou, não foi refatoração — foi alteração.",
  },
  {
    term: "Regressão",
    definition:
      "Quando algo que funcionava para de funcionar por causa de uma mudança nova. É exatamente o que os testes automatizados existem para pegar.",
    seeAlso: ["CI / CD"],
  },
  {
    term: "Hotfix",
    definition:
      "Correção urgente aplicada direto em produção, fora do fluxo normal. Necessário às vezes, mas cada hotfix é sinal de algo que a esteira não pegou.",
    seeAlso: ["Deploy", "Rollback"],
  },
  {
    term: "Débito técnico",
    definition:
      "Atalho consciente que resolve agora e cobra depois. Não é erro — vira problema quando ninguém registra que existe.",
  },
  {
    term: "Variável de ambiente",
    definition:
      "Configuração que vem de fora do código: senha de banco, URL da API, chave de serviço. Muda por ambiente e nunca é versionada.",
    seeAlso: ["Produção", "Homologação"],
  },
];
