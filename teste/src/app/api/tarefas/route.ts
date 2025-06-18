import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const tarefas = await prisma.tarefa.findMany({
      orderBy: { created_at: 'desc' },
    })
    return NextResponse.json(tarefas)
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error)
    return NextResponse.json({ erro: 'Erro ao buscar tarefas' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.texto || typeof body.texto !== 'string') {
      return NextResponse.json({ erro: 'Texto inválido' }, { status: 400 })
    }

    const novaTarefa = await prisma.tarefa.create({
      data: { texto: body.texto },
    })

    return NextResponse.json(novaTarefa)
  } catch (error) {
    console.error('Erro ao criar tarefa:', error)
    return NextResponse.json({ erro: 'Erro ao criar tarefa' }, { status: 500 })
  }
}