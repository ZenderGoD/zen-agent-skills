import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class DashboardGenerator {
  constructor(rootDir) {
    this.visualMapPath = join(rootDir, '.cursor/intelligence/visual-map.json');
    this.performancePath = join(rootDir, '.cursor/analytics/performance-history.json');
    this.memoryPath = join(rootDir, '.cursor/memory/memory.json');
    this.eventLogPath = join(rootDir, '.cursor/orchestrator/events.log');
    this.outputPath = join(rootDir, '.cursor/analytics/dashboard.html');
  }

  async generate() {
    if (!existsSync(this.visualMapPath)) return { error: 'Run generate-map first.' };
    
    const mapData = JSON.parse(await readFile(this.visualMapPath, 'utf-8'));
    const perfData = existsSync(this.performancePath) ? JSON.parse(await readFile(this.performancePath, 'utf-8')) : [];
    const memoryData = existsSync(this.memoryPath) ? JSON.parse(await readFile(this.memoryPath, 'utf-8')) : { agentEvolution: {} };
    const eventLog = existsSync(this.eventLogPath) ? (await readFile(this.eventLogPath, 'utf-8')).trim().split('\n').map(l => JSON.parse(l)) : [];

    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Cursor AI OS Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { background: #0f172a; color: #e2e8f0; font-family: 'Inter', sans-serif; }
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1.5rem; }
        .stat-value { font-size: 2.25rem; font-weight: 700; color: #38bdf8; }
        .event-badge { padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
    </style>
</head>
<body class="p-8">
    <div class="max-w-7xl mx-auto">
        <header class="flex justify-between items-center mb-12">
            <div>
                <h1 class="text-4xl font-bold mb-2">🧠 Cursor AI OS</h1>
                <p class="text-slate-400">Collaborative Engineering Intelligence Dashboard</p>
            </div>
            <div class="text-right">
                <p class="text-sm text-slate-500">Last Updated</p>
                <p class="font-mono text-sky-400">${new Date().toLocaleString()}</p>
            </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="card text-center">
                <p class="text-slate-400 text-sm mb-1">Total Files</p>
                <p class="stat-value">${mapData.nodes.length}</p>
            </div>
            <div class="card text-center">
                <p class="text-slate-400 text-sm mb-1">Dependencies</p>
                <p class="stat-value">${mapData.links.length}</p>
            </div>
            <div class="card text-center">
                <p class="text-slate-400 text-sm mb-1">Perf Wins</p>
                <p class="stat-value">${perfData.length}</p>
            </div>
            <div class="card text-center">
                <p class="text-slate-400 text-sm mb-1">Events Logged</p>
                <p class="stat-value">${eventLog.length}</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div class="card lg:col-span-2">
                <h2 class="text-xl font-bold mb-6">Performance Evolution</h2>
                <canvas id="perfChart"></canvas>
            </div>
            <div class="card">
                <h2 class="text-xl font-bold mb-6">Live Event Stream</h2>
                <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    ${eventLog.slice(-10).reverse().map(e => `
                        <div class="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                            <div class="flex justify-between items-start mb-2">
                                <span class="text-sky-400 text-xs font-mono font-bold uppercase">/${e.agent}</span>
                                <span class="text-slate-500 text-[10px]">${new Date(e.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p class="text-sm text-slate-300 font-medium">${e.type}</p>
                            <p class="text-xs text-slate-500 truncate mt-1">${JSON.stringify(e.data)}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div class="card">
                <h2 class="text-xl font-bold mb-6">Agent Capability Matrix</h2>
                <div class="space-y-4">
                    ${Object.entries(memoryData.agentEvolution).map(([name, data]) => `
                        <div>
                            <div class="flex justify-between mb-1">
                                <span class="text-sm font-bold text-slate-300">/${name}</span>
                                <span class="text-xs text-sky-400">${(data.successRate * 100).toFixed(0)}% Accuracy</span>
                            </div>
                            <div class="w-full bg-slate-700 rounded-full h-1.5">
                                <div class="bg-sky-500 h-1.5 rounded-full" style="width: ${data.successRate * 100}%"></div>
                            </div>
                            <div class="flex flex-wrap gap-2 mt-2">
                                ${data.capabilities.map(c => `<span class="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded border border-slate-700">${c}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="card">
                <h2 class="text-xl font-bold mb-6">File Hotspots</h2>
                <canvas id="typeChart"></canvas>
            </div>
        </div>
    </div>

    <script>
        const typeData = ${JSON.stringify(this.getDistribution(mapData.nodes))};
        new Chart(document.getElementById('typeChart'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(typeData),
                datasets: [{
                    data: Object.values(typeData),
                    backgroundColor: ['#38bdf8', '#818cf8', '#fb7185', '#34d399', '#fbbf24']
                }]
            },
            options: { plugins: { legend: { position: 'right', labels: { color: '#94a3b8', font: { size: 10 } } } } }
        });

        const perfPoints = ${JSON.stringify(perfData.slice(-15))};
        new Chart(document.getElementById('perfChart'), {
            type: 'line',
            data: {
                labels: perfPoints.map(p => new Date(p.timestamp).toLocaleDateString()),
                datasets: [{
                    label: 'Improvement %',
                    data: perfPoints.map(p => ((p.before - p.after) / p.before) * 100),
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: { scales: { y: { grid: { color: '#1e293b' }, ticks: { color: '#94a3b8' } }, x: { grid: { display: false }, ticks: { color: '#94a3b8' } } } }
        });
    </script>
</body>
</html>
    `;

    await writeFile(this.outputPath, html);
    return { message: `Finalized dashboard at ${this.outputPath}` };
  }

  getDistribution(nodes) {
    const dist = {};
    nodes.forEach(n => { dist[n.type] = (dist[n.type] || 0) + 1; });
    return dist;
  }
}
