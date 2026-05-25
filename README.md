# Score Relacional — Looker Studio Community Visualization

Card visual dinâmico que exibe o Score Relacional de um cliente com barras por eixo (S, F, V, M), score final colorido e classificação.

## Uso no Looker Studio

1. No relatório em modo edição, vá em **Comunidade > Visualizações e componentes > Criar sua própria visualização**
2. Cole o Manifest URL: `https://vferreiraolx.github.io/viz/manifest.json`
3. Adicione o componente ao relatório
4. Configure:
   - **Dimensão**: `advertiser_name`
   - **Métricas** (nesta ordem):
     1. `eixo_estabilidade` (MAX)
     2. `eixo_frequencia` (MAX)
     3. `eixo_valor` (MAX)
     4. `eixo_momentum` (MAX)
     5. `score_relacional_v2` (MAX)
   - **Fonte**: `vw_re_ba_score_relacional_v2`

## Arquivos

- `manifest.json` — manifesto da visualização
- `scoreCard.js` — lógica de renderização
- `scoreCard.css` — estilos visuais
- `scoreCard.json` — configuração de campos

## Sem dados sensíveis

Este repositório contém APENAS código de visualização (HTML/CSS/JS).
Nenhum dado de cliente, credencial ou informação de negócio está presente.
