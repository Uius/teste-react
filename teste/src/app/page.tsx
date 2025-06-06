"use client";

import { useState, useEffect } from "react";

type Tarefa = {
  id: number;
  texto: string;
};

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  // Carrega tarefas da API (vamos criar isso depois)
  useEffect(() => {
    fetch("/api/tarefas")
      .then((res) => res.json())
      .then((data) => setTarefas(data));
  }, []);

  // Adiciona tarefa nova
  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === "") return;

    const res = await fetch("/api/tarefas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texto: novaTarefa }),
    });

    const tarefaCriada = await res.json();
    setTarefas((prev) => [...prev, tarefaCriada]);
    setNovaTarefa("");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
      <h1 className="text-3xl font-bold mb-6">📋 Lista de Tarefas</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="px-4 py-2 rounded border border-gray-300"
          placeholder="Digite uma tarefa..."
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <button
          onClick={adicionarTarefa}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar
        </button>
      </div>

      <ul className="w-full max-w-md">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className="bg-white p-3 rounded shadow mb-2 border border-gray-200"
          >
            {tarefa.texto}
          </li>
        ))}
      </ul>
    </main>
  );
}
