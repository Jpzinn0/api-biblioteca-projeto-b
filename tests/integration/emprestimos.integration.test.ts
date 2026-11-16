import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { criarApp } from '../../src/app.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = criarApp();

describe('POST /emprestimos (Integração)', () => {
  beforeEach(async () => {
    // Limpa dados anteriores para evitar conflitos de chave estrangeira e estado
    await prisma.emprestimo.deleteMany();
    await prisma.livro.deleteMany();

    // Cria massa de dados fresca para os testes
    await prisma.livro.create({
      data: { id: 1, titulo: 'Clean Code', autor: 'Robert C. Martin', disponivel: true }
    });

    await prisma.livro.create({
      data: { id: 2, titulo: 'Arquitetura Limpa', autor: 'Robert C. Martin', disponivel: false }
    });
  });

  it('deve registrar um novo empréstimo com sucesso aplicando a regra de 14 dias', async () => {
    const response = await request(app)
      .post('/emprestimos')
      .send({
        livroId: 1, // Livro 1 criado como disponível no beforeEach
        leitor: 'Teste Automatizado'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.leitor).toBe('Teste Automatizado');
    expect(response.body).toHaveProperty('dataEmprestimo');
    expect(response.body).toHaveProperty('dataDevolucao');
  });

  it('deve retornar conflito (409) ao tentar emprestar um livro que já está indisponível', async () => {
    const response = await request(app)
      .post('/emprestimos')
      .send({
        livroId: 2, // Livro 2 criado como indisponível no beforeEach
        leitor: 'Outro Leitor'
      });

    expect(response.status).toBe(409);
  });
});