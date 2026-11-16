import { describe, it, expect } from 'vitest';

// Função pura que simula a regra de negócio R3 (prazo fixo de 14 dias)
function calcularDataDevolucao(dataAtual, diasPrazo = 14) {
  const devolucao = new Date(dataAtual);
  devolucao.setDate(devolucao.getDate() + diasPrazo);
  return devolucao;
}

describe('Domínio: Regra de Prazo de Devolução (R3)', () => {
  it('deve calcular exatamente 14 dias de prazo para a devolução do livro', () => {
    const hoje = new Date('2026-11-16T00:00:00.000Z');
    const devolucaoCalculada = calcularDataDevolucao(hoje, 14);

    const esperado = new Date('2026-11-30T00:00:00.000Z');
    expect(devolucaoCalculada.toISOString()).toBe(esperado.toISOString());
  });
});