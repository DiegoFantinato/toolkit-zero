# Toolkit Zero

Ecossistema modular para criação, manutenção e evolução segura de sistemas, com governança, pesquisa, experimentação e automação.

## Objetivo

O Toolkit Zero serve como base reutilizável para dois cenários oficiais:

- **Greenfield**: criação de sistemas novos com descoberta, arquitetura, quality gates, testes e implementação orientada por módulos.
- **Maintenance / Legacy**: manutenção de sistemas existentes com descoberta, baseline, mapa de dependências, mudanças em lotes e preservação de comportamento.

## Arquitetura operacional

- **Notion = cérebro operacional**: pesquisa, decisões, roadmap, experimentos, módulos e revisões.
- **Git = verdade técnica**: código, prompts, templates, testes, versões e releases.
- **VPS = motor automático**: execução, testes, automações e Toolkit Maintainer.

## Estrutura inicial

- `core/` — princípios e padrões universais.
- `modules/` — capacidades opcionais por domínio ou necessidade.
- `prompts/` — fluxos de trabalho com agentes.
- `libraries/` — código executável reutilizável e testado.
- `templates/` — pontos de partida por stack e modo de entrada.
- `tests/` — validações e regressões do toolkit.
- `governance/` — segurança, decisões, versionamento e fontes.

## Regra central

> Pesquisa pode sugerir. Experimento pode provar. Maintainer pode preparar. Só uma decisão aprovada promove algo para o Toolkit oficial.

## Status

Versão inicial de estrutura e governança. A primeira biblioteca técnica planejada é `TZ ESLint Quality Gates`.
