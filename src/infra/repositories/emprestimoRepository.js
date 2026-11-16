export class EmprestimoRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async criar(dados) {
    return await this.prisma.emprestimo.create({
      data: dados
    });
  }
}