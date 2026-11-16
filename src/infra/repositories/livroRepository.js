export class LivroRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async buscarPorId(id) {
    return await this.prisma.livro.findUnique({
      where: { id: Number(id) }
    });
  }

  async atualizarDisponibilidade(id, disponivel) {
    return await this.prisma.livro.update({
      where: { id: Number(id) },
      data: { disponivel }
    });
  }
}