# Security

## Princípios

- Nunca incorporar código externo sem revisão de origem, comportamento e dependências.
- Não executar conteúdo recebido em Research Inbox por padrão.
- Separar análise, experimento e promoção.
- Tratar autenticação, autorização, pagamentos, dados pessoais, banco de dados e lógica crítica como áreas de alto risco.
- Mudanças de alto risco exigem revisão explícita antes de promoção.
- Dependências devem ser versionadas e atualizadas deliberadamente.
- Testes de regressão acompanham regras e bibliotecas executáveis.

## Research Intake

Conteúdo externo pode conter código inseguro, instruções enganosas ou práticas incompatíveis. O fluxo padrão é:

1. identificar a fonte e a alegação;
2. verificar aplicabilidade e riscos;
3. classificar o destino;
4. testar isoladamente quando necessário;
5. promover apenas após os gates definidos.

## Incidentes

Se uma alteração aprovada gerar regressão ou risco, ela deve ser revertida ou isolada, registrada no changelog e revisitada com nova decisão.
