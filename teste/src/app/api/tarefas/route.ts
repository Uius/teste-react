let tarefas: { id: number; texto: string }[] = [];
let contadorId = 1;

export async function GET() {
  return Response.json(tarefas);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.texto || typeof body.texto !== "string") {
    return new Response("Texto inválido", { status: 400 });
  }

  const novaTarefa = {
    id: contadorId++,
    texto: body.texto,
  };

  tarefas.push(novaTarefa);

  return Response.json(novaTarefa, { status: 201 });
}
