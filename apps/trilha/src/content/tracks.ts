import type { Phase, Track } from "./types";

export const tracks: Track[] = [
  {
    id: "core",
    name: "Base comum",
    shortName: "Base",
    description:
      "Só o que as três trilhas precisam: ambientação, terminal, Git, como a web funciona, JavaScript e TypeScript, mais a fase final de integração. Não é uma trilha de estudo — é a interseção das outras três.",
    isCore: true,
  },
  {
    id: "front",
    name: "Front-end",
    shortName: "Front",
    description:
      "Da marcação semântica ao React em produção: HTML acessível, CSS que não quebra em nenhuma largura, estado, formulários, o design system da CLG, testes de interface e performance percebida.",
    isCore: false,
  },
  {
    id: "back",
    name: "Back-end",
    shortName: "Back",
    description:
      "O mundo sem navegador: processo e porta, modelagem de dados, API REST validada, Postgres com migrations, arquitetura em camadas, autenticação, filas e testes de API.",
    isCore: false,
  },
  {
    id: "devops",
    name: "DevOps",
    shortName: "DevOps",
    description:
      "Do Linux e da rede até o código no ar: Docker e Compose, esteira no GitHub Actions, configuração por ambiente, deploy com rollback, observabilidade e segurança da própria esteira.",
    isCore: false,
  },
];

export const phases: Phase[] = [
  {
    id: "aterrissagem",
    title: "Aterrissagem",
    intent:
      "Ambiente montado, acessos liberados e a primeira PR aberta. O objetivo da semana não é aprender a programar — é deixar de estar perdido.",
    dayRange: [1, 5],
  },
  {
    id: "fundamentos",
    title: "Fundamentos",
    intent:
      "As bases que não caducam. Uma parte é comum às três trilhas — como a web funciona, JavaScript, TypeScript, Git — e outra já é da trilha escolhida: quem vai para o front aprende HTML e CSS aqui; quem vai para o back, modelagem de dados.",
    dayRange: [6, 30],
  },
  {
    id: "especializacao",
    title: "Especialização",
    intent:
      "As três trilhas correm em paralelo e não se misturam: escolhida uma, o caminho mostra só o que ela exige. Visitar as outras é opcional e serve para saber o que existe do outro lado.",
    dayRange: [31, 60],
  },
  {
    id: "integracao",
    title: "Integração",
    intent:
      "Uma feature de ponta a ponta, revisada pelo time e publicada pela esteira. É aqui que ele deixa de ser alguém que estuda e vira alguém que entrega.",
    dayRange: [61, 90],
  },
];

export const trackById = new Map(tracks.map((track) => [track.id, track]));
export const phaseById = new Map(phases.map((phase) => [phase.id, phase]));
