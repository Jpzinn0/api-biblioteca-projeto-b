import express from 'express';
import { PrismaClient } from '@prisma/client';
import { LivroRepository } from './infra/repositories/livroRepository.js';
import { EmprestimoRepository } from './infra/repositories/emprestimoRepository.js';
import { EmprestimoService } from './domain/emprestimoService.js';
import { criarEmprestimoRoutes } from './routes/emprestimoRoutes.js';

// Função que monta o app. Receber as dependências por parâmetro (como o prisma)
// permite trocá-las facilmente por mocks ou fakes nos testes automatizados.
export function criarApp({
  prisma = new PrismaClient(),
  prazoDias = Number(process.env.PRAZO_EMPRESTIMO_DIAS) || 14,
} = {}) {
  const app = express();
  
  // Permite que o Express compreenda e leia corpos de requisição em formato JSON
  app.use(express.json());

  // ----------------------------------------------------
  // Composition Root: Ligação de dependências (Injeção)
  // ----------------------------------------------------
  const livroRepository = new LivroRepository(prisma);
  const emprestimoRepository = new EmprestimoRepository(prisma);
  const emprestimoService = new EmprestimoService({ 
    livroRepository, 
    emprestimoRepository, 
    prazoDias 
  });

  // Registra as rotas da aplicação sob o prefixo /emprestimos
  app.use('/emprestimos', criarEmprestimoRoutes(emprestimoService));

  // ----------------------------------------------------
  // Middleware global de tratamento de erros
  // (Os 4 parâmetros são obrigatórios para o Express reconhecer como erro)
  // ----------------------------------------------------
  app.use((erro, _req, res, _next) => {
    // Se for um erro controlado do domínio (AppError), devolve o status HTTP customizado
    if (erro.name === 'AppError') {
      return res.status(erro.status).json({ erro: erro.message });
    }
    
    // Loga erros inesperados no console (que virarão logs estruturados futuramente)
    console.error(erro); 
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  });

  return app;
}