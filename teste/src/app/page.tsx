'use client';

import { useEffect, useState } from 'react';

type Tarefa = {
  id: number;
  texto: string;
};

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  async function carregarTarefas() {
    const res = await fetch('/api/tarefas');
    const dados = await res.json();
    setTarefas(dados);
  }

  async function adicionarTarefa() {
    if (!novaTarefa.trim()) return;

    const res = await fetch('/api/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: novaTarefa }),
    });

    if (res.ok) {
      setNovaTarefa('');
      carregarTarefas();
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          📋 Lista de Tarefas
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Digite uma tarefa..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800"
          />
          <button
            onClick={adicionarTarefa}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Adicionar
          </button>
        </div>

        <ul className="space-y-3">
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm text-gray-700"
            >
              {tarefa.texto}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
