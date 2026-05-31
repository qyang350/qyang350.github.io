function initCharts() {
  const monoFont = "'DM Mono', monospace";
  const textDim = '#9ca3af';
  const textMuted = '#6b7280';

  Promise.all([
    fetch('assets/data/propensity_model_lift_analysis.csv').then(r => r.text()),
    fetch('assets/data/propensity_model_feature_importance.csv').then(r => r.text())
  ]).then(([liftCsv, featCsv]) => {

    const liftData = Papa.parse(liftCsv, { header: true, dynamicTyping: true }).data;
    const featData = Papa.parse(featCsv, { header: true, dynamicTyping: true }).data;

    new Chart(document.getElementById('liftChart'), {
      type: 'line',
      data: {
        labels: liftData.map(r => r.decile),
        datasets: [
          {
            label: 'Model',
            data: liftData.map(r => r.model_lift),
            borderColor: '#1A73E8',
            backgroundColor: 'rgba(26,115,232,0.1)',
            borderWidth: 2, pointRadius: 2,
            pointBackgroundColor: '#1A73E8',
            fill: true, tension: 0.35
          },
          {
            label: 'Random',
            data: liftData.map(r => r.random_lift),
            borderColor: textDim,
            borderWidth: 1.5,
            borderDash: [4, 4],
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { font: { family: monoFont, size: 9 }, color: textDim },
            grid: { color: 'rgba(0,0,0,0.04)' },
            title: { display: true, text: 'Decile', font: { family: monoFont, size: 9 }, color: textDim }
          },
          y: {
            min: 0.8, max: 5.0,
            ticks: { font: { family: monoFont, size: 9 }, color: textDim, callback: v => v + '×', maxTicksLimit: 4 },
            grid: { color: 'rgba(0,0,0,0.04)' }
          }
        }
      }
    });

    new Chart(document.getElementById('featChart'), {
      type: 'bar',
      data: {
        labels: featData.map(r => r.feature),
        datasets: [{
          data: featData.map(r => r.importance),
          backgroundColor: [
            '#1A73E8','rgba(26,115,232,.75)','rgba(26,115,232,.6)',
            'rgba(26,115,232,.5)','rgba(26,115,232,.38)','rgba(26,115,232,.28)'
          ],
          borderRadius: 2, borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { font: { family: monoFont, size: 9 }, color: textDim, maxTicksLimit: 4 },
            grid: { color: 'rgba(0,0,0,0.04)' }
          },
          y: {
            ticks: { font: { family: monoFont, size: 9 }, color: textMuted },
            grid: { display: false }
          }
        }
      }
    });

  }).catch(err => console.error('Failed to load chart data:', err));
}