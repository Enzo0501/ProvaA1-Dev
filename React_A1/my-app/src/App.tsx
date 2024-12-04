import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import TarefaCadastrar from "./components/pages/tarefa/TarefaCadastrar";
import TarefaListar from "./components/pages/tarefa/TarefaListar";
import TarefaAlterar from "./components/pages/tarefa/TarefaAlterar";
import TarefaNaoConcluidas from "./components/pages/tarefa/TarefaNaoConcluidas";
import TarefasConcluidas from "./components/pages/tarefa/TarefasConcluidas";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tarefas/listar">Listar Tarefas</Link>
            </li>
            <li>
              <Link to="/tarefas/cadastrar">Cadastrar Tarefa</Link>
            </li>
            <li>
              <Link to="/tarefas/naoconcluidas">Tarefas Não Concluídas</Link>
            </li>
            <li>
              <Link to="/tarefas/concluidas">Tarefas Concluídas</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/tarefas/listar" element={<TarefaListar />} />
          <Route path="/tarefas/cadastrar" element={<TarefaCadastrar />} />
          <Route path="/tarefas/alterar/:id" element={<TarefaAlterar />} />
          <Route path="/tarefas/naoconcluidas" element={<TarefaNaoConcluidas />} />
          <Route path="/tarefas/concluidas" element={<TarefasConcluidas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
