import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Categoria } from "../../../models/Categoria";

function TarefaCadastrar() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [status, setStatus] = useState("Não iniciada");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Categoria[]>("http://localhost:5275/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao carregar categorias", erro);
      });
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const novaTarefa = {
      Titulo: titulo,
      Descricao: descricao,
      CategoriaId: categoriaId,
      Status: status,
    };

    axios
      .post("http://localhost:5275/api/tarefas/cadastrar", novaTarefa)
      .then(() => {
        navigate("/tarefas/listar");
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar tarefa", erro);
      });
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categoria</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.CategoriaId} value={categoria.CategoriaId}>
                {categoria.Nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Não iniciada">Não iniciada</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default TarefaCadastrar;
