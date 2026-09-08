import type { Module, TrackId } from "../types";
import { aterrissagemModules } from "./aterrissagem";
import { fundamentosModules } from "./fundamentos";
import { frontModules } from "./front";
import { backModules } from "./back";
import { devopsModules } from "./devops";
import { integracaoModules } from "./integracao";

/**
 * Ordem canônica da trilha inteira, definida pelo campo `order` de cada módulo
 * — não pela posição no arquivo. É o que permite a um fundamento de front
 * (HTML, CSS) aparecer antes de um da base comum (JavaScript) sem que os
 * arquivos precisem ser organizados por sequência em vez de por trilha.
 */
export const modules: Module[] = [
  ...aterrissagemModules,
  ...fundamentosModules,
  ...frontModules,
  ...backModules,
  ...devopsModules,
  ...integracaoModules,
].sort((a, b) => a.order - b.order);

export const moduleById = new Map(modules.map((module) => [module.id, module]));

export const specializationTracks: TrackId[] = ["front", "back", "devops"];

/**
 * Em que caminhos o módulo entra. Ver a documentação de `Module.paths`:
 * `core` sem declaração explícita entra nas três especializações.
 */
export function pathsOf(module: Module): TrackId[] {
  if (module.paths) return module.paths;
  return module.trackId === "core" ? specializationTracks : [module.trackId];
}

export function modulesByTrack(trackId: TrackId): Module[] {
  return modules.filter((module) => module.trackId === trackId);
}

/**
 * O caminho completo de uma trilha: tudo que quem segue essa trilha precisa
 * percorrer, e nada além disso.
 *
 * É esta função que impede o back-end de receber módulo de CSS. A trilha
 * `core` não é um caminho de estudo — é o conjunto de módulos comuns às três.
 */
export function modulesForTrackPath(trackId: TrackId): Module[] {
  if (trackId === "core") return modulesByTrack("core");
  return modules.filter((module) => pathsOf(module).includes(trackId));
}

export function hoursOf(list: Module[]): number {
  return list.reduce((sum, module) => sum + module.estimatedHours, 0);
}

export const totalHours = hoursOf(modules);
