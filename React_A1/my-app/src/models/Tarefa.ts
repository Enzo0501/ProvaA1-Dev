import { Categoria } from "./Categoria";

export interface Tarefa {
  TarefaId: string;
  Titulo?: string;
  Descricao?: string;
  Status: "Não iniciada" | "Em andamento" | "Concluído";
  CriadoEm: string;
  Categoria?: Categoria;
  CategoriaId?: string;
}
