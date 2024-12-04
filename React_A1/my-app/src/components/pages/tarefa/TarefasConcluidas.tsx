import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tarefa } from "../../../models/Tarefa";

function TarefasConcluidas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Tarefa[]>("http://localhost:5275/api/tarefas/concluidas")
      .then((resposta) => {
        setTarefas(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar tarefas concluídas", erro);
        setError("Erro ao carregar tarefas.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Tarefas Concluídas</h1>
      {tarefas.length === 0 ? (
        <p>Não há tarefas concluídas.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.TarefaId}>
              {tarefa.Titulo} - {tarefa.Status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TarefasConcluidas;
