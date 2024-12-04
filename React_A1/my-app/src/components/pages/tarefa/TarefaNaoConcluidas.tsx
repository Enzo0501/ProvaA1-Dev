import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tarefa } from "../../../models/Tarefa";

function TarefaNaoConcluidas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Tarefa[]>("http://localhost:5275/api/tarefa/naoconcluidas")
      .then((resposta) => {
        setTarefas(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar tarefas não concluídas", erro);
        setError("Erro ao carregar tarefas.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Tarefas Não Concluídas</h1>
      {tarefas.length === 0 ? (
        <p>Não há tarefas não concluídas.</p>
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

export default TarefaNaoConcluidas;
