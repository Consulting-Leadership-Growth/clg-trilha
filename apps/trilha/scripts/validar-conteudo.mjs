/**
 * Valida a integridade do conteúdo da trilha.
 *
 * Roda com `npm run validar`. A esteira executa antes do build: conteúdo
 * inconsistente (pré-requisito fora do caminho, ordem impossível, id repetido)
 * quebra a navegação de um jeito que o TypeScript não pega.
 */
import { build } from "esbuild";

const bundle = await build({
  entryPoints: ["src/content/modules/index.ts"],
  bundle: true,
  format: "cjs",
  write: false,
  platform: "node",
  logLevel: "silent",
});

const shim = { exports: {} };
new Function("module", "exports", "require", bundle.outputFiles[0].text)(shim, shim.exports, () => {});

const { modules, pathsOf, modulesForTrackPath, specializationTracks, hoursOf } = shim.exports;

const problemas = [];
const ids = new Set(modules.map((m) => m.id));
const porId = new Map(modules.map((m) => [m.id, m]));

// ids únicos
const vistos = new Set();
for (const m of modules) {
  if (vistos.has(m.id)) problemas.push(`id repetido: ${m.id}`);
  vistos.add(m.id);
}

// order única
const ordens = new Map();
for (const m of modules) {
  if (ordens.has(m.order)) problemas.push(`order ${m.order} repetida: ${m.id} e ${ordens.get(m.order)}`);
  ordens.set(m.order, m.id);
}

for (const m of modules) {
  const caminhos = pathsOf(m);

  for (const pre of m.prerequisites) {
    if (!ids.has(pre)) {
      problemas.push(`${m.id}: pré-requisito inexistente "${pre}"`);
      continue;
    }

    const anterior = porId.get(pre);

    if (anterior.order >= m.order) {
      problemas.push(
        `${m.id} (order ${m.order}) depende de ${pre} (order ${anterior.order}), que vem depois ou junto`,
      );
    }

    // A regra que separa as trilhas: o pré-requisito precisa estar em TODO
    // caminho que contém quem depende dele, senão a interface aponta para um
    // módulo que aquela trilha nunca percorre.
    const caminhosDoPre = pathsOf(anterior);
    const faltando = caminhos.filter((t) => !caminhosDoPre.includes(t));
    if (faltando.length > 0) {
      problemas.push(
        `${m.id}: pré-requisito "${pre}" não existe no caminho ${faltando.join(", ")}`,
      );
    }
  }

  // chaves de React
  const dup = (lista, nome) => {
    if (new Set(lista).size !== lista.length) problemas.push(`${m.id}: ${nome} com item repetido`);
  };
  dup(m.resources.map((r) => r.label), "resources");
  dup(m.doneWhen, "doneWhen");
  dup(m.exercise.steps, "exercise.steps");

  for (const q of m.quiz ?? []) {
    if (q.answerIndex < 0 || q.answerIndex >= q.options.length) {
      problemas.push(`${m.id}/${q.id}: answerIndex fora do intervalo`);
    }
    dup(q.options, `quiz ${q.id} options`);
  }
}

const idsQuiz = new Set();
for (const m of modules) {
  for (const q of m.quiz ?? []) {
    if (idsQuiz.has(q.id)) problemas.push(`id de questão repetido: ${q.id}`);
    idsQuiz.add(q.id);
  }
}

// Nenhuma trilha pode conter módulo de outra especialização.
for (const track of specializationTracks) {
  for (const m of modulesForTrackPath(track)) {
    if (m.trackId !== "core" && !pathsOf(m).includes(track)) {
      problemas.push(`caminho ${track} contém ${m.id}, que é de ${m.trackId}`);
    }
  }
}

console.log(`módulos: ${modules.length}  ·  horas: ${hoursOf(modules)}`);
for (const track of specializationTracks) {
  const caminho = modulesForTrackPath(track);
  console.log(`  ${track.padEnd(7)} ${String(caminho.length).padStart(2)} módulos · ${hoursOf(caminho)} h`);
}

if (problemas.length > 0) {
  console.error(`\n${problemas.length} problema(s):`);
  for (const p of problemas) console.error("  - " + p);
  process.exit(1);
}

console.log("\nconteúdo íntegro");
