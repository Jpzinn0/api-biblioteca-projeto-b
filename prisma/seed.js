import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.livro.createMany({
    data: [
      { titulo: 'Clean Code', autor: 'Robert C. Martin', disponivel: true },
      { titulo: 'Arquitetura Limpa', autor: 'Robert C. Martin', disponivel: true },
      { titulo: 'O Programador Pragmático', autor: 'Andrew Hunt', disponivel: true },
    ],
    skipDuplicates: true,
  });
  console.log('Livros de seed cadastrados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });