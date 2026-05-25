/**
 * Score Relacional Card — Looker Studio Community Visualization
 * Uses the dscc helper loaded via Looker's runtime (no npm required).
 * 
 * NO CLIENT DATA OR SENSITIVE INFORMATION IN THIS FILE.
 */

function getScoreColor(score) {
  if (score >= 9.5) return 'score-10';
  if (score >= 8.5) return 'score-9';
  if (score >= 7.5) return 'score-8';
  if (score >= 6.5) return 'score-7';
  if (score >= 5.5) return 'score-6';
  if (score >= 4.5) return 'score-5';
  if (score >= 3.5) return 'score-4';
  if (score >= 2.5) return 'score-3';
  return 'score-1';
}

function getClassification(score) {
  if (score >= 8.5) return { label: 'Premium', cls: 'class-premium' };
  if (score >= 7.0) return { label: 'Saudável', cls: 'class-healthy' };
  if (score >= 5.0) return { label: 'Atenção', cls: 'class-watch' };
  if (score >= 3.0) return { label: 'Risco', cls: 'class-risk' };
  return { label: 'Crítico', cls: 'class-critical' };
}

function renderAxis(letter, label, value, colorClass) {
  var pct = Math.min(100, Math.max(0, value * 100)).toFixed(0);
  return '<div class="axis-row">' +
    '<div class="axis-label"><span class="axis-badge badge-' + colorClass + '">' + letter + '</span><span>' + label + '</span></div>' +
    '<div class="bar-track"><div class="bar-fill fill-' + colorClass + '" style="width:' + pct + '%"></div></div>' +
    '<div class="axis-value">' + value.toFixed(2) + '</div>' +
    '</div>';
}

function drawViz(data) {
  var tables = data.tables;
  var root = document.body;

  if (!tables || !tables.DEFAULT || tables.DEFAULT.length === 0) {
    root.innerHTML = '<div class="score-card"><div class="no-data">Selecione um cliente no filtro</div></div>';
    return;
  }

  var row = tables.DEFAULT[0];

  // tableTransform: row is an array of arrays
  // dimensions[0] = client name
  // metrics[0..4] = S, F, V, M, Score
  var clientName = row.dimensions[0] || '—';
  var stability = parseFloat(row.metrics[0]) || 0;
  var frequency = parseFloat(row.metrics[1]) || 0;
  var valueAxis = parseFloat(row.metrics[2]) || 0;
  var momentum = parseFloat(row.metrics[3]) || 0;
  var score = parseFloat(row.metrics[4]) || 0;

  var classification = getClassification(score);
  var scoreColor = getScoreColor(score);

  root.innerHTML =
    '<div class="score-card">' +
      '<div class="client-name">' + clientName + '</div>' +
      '<div class="axes-container">' +
        renderAxis('S', 'Estabilidade', stability, 's') +
        renderAxis('F', 'Frequência', frequency, 'f') +
        renderAxis('V', 'Valor', valueAxis, 'v') +
        renderAxis('M', 'Momentum', momentum, 'm') +
      '</div>' +
      '<div class="score-section">' +
        '<div class="score-pill ' + scoreColor + '">' + score.toFixed(1) + '</div>' +
        '<span class="classification-tag ' + classification.cls + '">' + classification.label + '</span>' +
      '</div>' +
    '</div>';
}

// Looker Studio injects dscc globally
dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
