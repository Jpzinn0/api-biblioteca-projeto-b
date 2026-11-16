import { Router } from 'express';

export function criarEmprestimoRoutes(emprestimoService) {
  const router = Router();

  router.post('/', async (req, res, next) => {
    try {
      const { livroId, leitor } = req.body;
      const emprestimo = await emprestimoService.criarEmprestimo({ livroId, leitor });
      return res.status(201).json(emprestimo);
    } catch (erro) {
      next(erro);
    }
  });

  return router;
}