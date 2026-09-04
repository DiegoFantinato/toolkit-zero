# Decisions

Este arquivo resume decisões arquiteturais estáveis do Toolkit Zero. Decisões detalhadas e aprovações operacionais são registradas no Notion.

## D-001 — Arquitetura híbrida

**Status:** aprovada

- Notion: governança, pesquisa, roadmap, experimentos e decisões.
- Git: fonte técnica oficial.
- VPS: execução, testes, automações e maintainer.

## D-002 — Internalização de código executável

Código externo relevante pode inspirar ou ser incorporado, mas não deve ser consumido cegamente do `main` de terceiros. Mudanças passam por revisão, testes, versionamento e changelog próprios.

## D-003 — Core pequeno e módulos opcionais

O Core deve conter apenas princípios amplamente reutilizáveis. Capacidades específicas de domínio ficam em módulos opt-in.

## D-004 — Dois modos de entrada

O Toolkit Zero suporta oficialmente:

- Greenfield.
- Maintenance / Legacy.

Projetos existentes exigem descoberta, baseline e preservação de comportamento antes de refatoração ou padronização.

## D-005 — Promoção por gates

Pesquisa pode sugerir, experimento pode provar e o maintainer pode preparar mudanças. Promoções de alto impacto para o Toolkit oficial exigem decisão aprovada.
