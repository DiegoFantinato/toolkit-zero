# TZ ESLint Quality Gates

Status: **experimental** (`0.1.0-dev`).

Primeira biblioteca técnica do Toolkit Zero. O objetivo é oferecer gates reutilizáveis sem impor arquitetura específica a todos os projetos.

## Regras

### `quality/max-lines`
Limita tamanho de arquivos-fonte para sinalizar responsabilidades excessivas. O padrão é 350 linhas, mas o valor deve ser calibrado por projeto. Testes, tipos/barrels e caminhos baseline podem ser tratados separadamente.

### `quality/no-direct-console`
Bloqueia uso direto de `console.*` em código de aplicação. Testes são ignorados por padrão. A V0.1 também detecta acesso computado simples como `console["error"]`.

### `quality/no-direct-data-access`
Regra **opt-in**. Bloqueia imports diretos de módulos de dados dentro de camadas configuradas. Não existe uma arquitetura universal embutida: módulos e camadas devem ser informados pelo projeto.

## Preset

`presets/base.mjs` ativa:

- `max-lines` como `warn` por padrão;
- `no-direct-console` como `error`;
- `no-direct-data-access` permanece desligada até existir uma arquitetura real para configurar.

Isso preserva a estratégia de baseline: dívida existente pode começar como warning, enquanto regressões novas podem ser tratadas como erro após medição.

## Testes

`tests/verify.mjs` é uma suíte permanente com `RuleTester`. Ela deve ser executada sempre que:

- uma regra for alterada;
- ESLint for atualizado;
- uma mudança upstream for avaliada para incorporação;
- um falso positivo/negativo for corrigido.

## Segurança e governança

Esta biblioteca não deve consumir código remoto em runtime e não deve atualizar-se diretamente a partir de branches `main` de terceiros. Mudanças externas passam por diff, revisão, teste e decisão registrada antes de promoção.

## Próximos passos da V0.1

1. Executar a suíte em ambiente limpo com ESLint 9.
2. Adicionar casos de regressão para Windows paths e falsos positivos de camadas.
3. Criar preset typed-safety separado para TypeScript type-aware lint.
4. Validar em um projeto piloto antes de promover de experimental.
