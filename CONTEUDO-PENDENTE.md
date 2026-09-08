# Conteúdo pendente

A trilha está completa e navegável: **50 módulos**, 156 recursos com links públicos verificados,
22 questões de quiz, exercícios e critérios de conclusão. O que falta é o que só vocês sabem —
links internos e a spec do projeto final.

Nada disso trava a entrega. Enquanto a `url` estiver vazia, a interface mostra
**"Material interno — peça o link ao seu mentor"** em vez de um link quebrado. Vocês preenchem
conforme for existindo.

## Como preencher

Cada item abaixo é um `Resource` com `internal: true` e `url: ""` em
`apps/trilha/src/content/modules/`. Basta colar a URL:

```ts
{
  label: "Checklist de acessos da CLG (e-mail, GitHub, VPN, senhas)",
  url: "https://notion.so/clg/checklist-acessos",   // <- aqui
  kind: "doc",
  internal: true,
  source: "CLG",
}
```

Mantenha `internal: true`: ele sinaliza que o link só abre para quem tem acesso, o que evita
frustração quando o dev clica e cai num 403.

> Três documentos aparecem em mais de um módulo (marcados abaixo). Preencha a URL em todas as
> ocorrências — uma busca pelo rótulo no diretório `modules/` encontra todas.

## 17 documentos, em 21 ocorrências

### Prioridade alta — a primeira semana depende deles

| Módulo | Item |
| --- | --- |
| Bem-vindo à CLG | Apresentação institucional da CLG |
| Bem-vindo à CLG | Organograma e quem procurar para cada assunto |
| Bem-vindo à CLG | Repositórios ativos do time |
| Máquina pronta e acessos liberados | Checklist de acessos (e-mail, GitHub, VPN, senhas) |
| Como pedir ajuda | Combinados do time: onde perguntar e tempo de resposta |
| Git no fluxo do time | Convenção de branches e commits da CLG |

### Prioridade média — necessários na fase de especialização

| Módulo | Item |
| --- | --- |
| Tailwind v4 e o design system da CLG | README do `@clg/design-system` |
| ORM e migrations | ORM escolhido nos projetos e o porquê |
| Autenticação e segurança básica · Segurança na esteira | Política de segurança e tratamento de dados **(2×)** |
| Estratégia de branches e versionamento | Estratégia de branches adotada pela CLG |
| Configuração e ambientes · Deploy, segredos e rollback | Onde a CLG hospeda cada projeto e quem tem acesso **(2×)** |
| Observabilidade · Levando ao ar | Onde ficam os logs e o monitoramento **(2×)** |

### Prioridade baixa — só a partir do dia 61

| Módulo | Item |
| --- | --- |
| Projeto final | **Especificação da feature** (o item mais importante da lista) |
| Projeto final | Repositório onde a feature será construída |
| Projeto final · Arquitetura em camadas | Padrões de código e arquitetura da CLG **(2×)** |
| Levando ao ar | Checklist de deploy e plano de rollback |
| Retrospectiva dos 90 dias | Plano de desenvolvimento individual |

## Outras decisões que ficaram com vocês

- **Mentores.** O tipo `Module` tem um campo `mentorId` opcional, hoje não preenchido em nenhum
  módulo e não exibido. Se quiserem mostrar quem é o responsável por cada assunto, preencham o
  campo e adicionem a exibição no trilho lateral de `ModulePage.tsx`.
- **A spec do projeto final.** É o módulo de 60 horas que define se os 90 dias valeram. Vale
  escrever com cuidado: requisito real, de um projeto real, com um usuário que vai usar.
- **Horas por trilha.** Front 294 h, Back 296 h, DevOps 266 h — cerca de 3,2 h/dia úteis em 90
  dias. Ajustem `estimatedHours` se a rotina de vocês for outra.
