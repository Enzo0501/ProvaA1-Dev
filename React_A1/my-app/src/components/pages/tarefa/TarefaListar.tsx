import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tarefa } from "../../../models/Tarefa";

function TarefaListar() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Tarefa[]>("http://localhost:5275/api/tarefas/listar")
      .then((resposta) => {
        console.log("Tarefas retornadas:", resposta.data);
        if (resposta.data && Array.isArray(resposta.data)) {
          setTarefas(resposta.data);
        } else {
          setError("Formato de dados inesperado.");
        }
      })
      .catch((erro) => {
        console.error("Erro ao carregar tarefas", erro);
        setError("Erro ao carregar tarefas.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      {tarefas.length === 0 ? (
        <p>Não há tarefas cadastradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.TarefaId}>
                <td>{tarefa.Titulo}</td>
                <td>{tarefa.Descricao}</td>
                <td>{tarefa.Categoria?.Nome}</td>
                <td>{tarefa.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TarefaListar;
