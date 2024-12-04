import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Tarefa } from "../../../models/Tarefa";

function TarefaAlterar() {
  const { id } = useParams();
  const [tarefa, setTarefa] = useState<Tarefa | null>(null);

  useEffect(() => {
    axios
      .get<Tarefa>(`http://localhost:5275/api/tarefa/alterar/${id}`)
      .then((resposta) => {
        setTarefa(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar tarefa", erro);
      });
  }, [id]);

  function alterarStatus() {
    if (tarefa) {
      axios
        .patch(`http://localhost:5275/api/tarefa/alterar/${id}`)
        .then((resposta) => {
          setTarefa(resposta.data);
        })
        .catch((erro) => {
          console.error("Erro ao alterar status da tarefa", erro);
        });
    }
  }

  return (
    <div>
      <h1>Alterar Tarefa</h1>
      {tarefa ? (
        <div>
          <p>{tarefa.Titulo}</p>
          <p>{tarefa.Descricao}</p>
          <p>Status: {tarefa.Status}</p>
          <button onClick={alterarStatus}>Alterar Status</button>
        </div>
      ) : (
        <p>Carregando tarefa...</p>
      )}
    </div>
  );
}

export default TarefaAlterar;
