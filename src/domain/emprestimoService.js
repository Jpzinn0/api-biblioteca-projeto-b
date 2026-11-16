export class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'AppError';
    this.status = status;
  }
}

export class EmprestimoService {
  constructor({ livroRepository, emprestimoRepository, prazoDias = 14 }) {
    this.livroRepository = livroRepository;
    this.emprestimoRepository = emprestimoRepository;
    this.prazoDias = prazoDias;
  }

  async criarEmprestimo({ livroId, leitor }) {
    // R1: Verificar se o livro existe
    const livro = await this.livroRepository.buscarPorId(livroId);
    if (!livro) {
      throw new AppError('Livro não encontrado', 404);
    }

    // R2: Verificar se o livro está disponível
    if (!livro.disponivel) {
      throw new AppError('Livro indisponível para empréstimo', 409);
    }

    // R3: Calcular prazo fixo de devolução
    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataDevolucao.getDate() + this.prazoDias);

    // Atualiza a disponibilidade do livro e registra o empréstimo em transação ou sequência lógica
    await this.livroRepository.atualizarDisponibilidade(livroId, false);

    const emprestimo = await this.emprestimoRepository.criar({
      livroId: Number(livroId),
      leitor,
      dataDevolucao,
    });

    return emprestimo;
  }
}