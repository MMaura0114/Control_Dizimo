// ====================== DATABASE ======================
let membros = JSON.parse(localStorage.getItem('membros')) || [];
let dizimos = JSON.parse(localStorage.getItem('dizimos')) || [];

function salvarDados() {
    localStorage.setItem('membros', JSON.stringify(membros));
    localStorage.setItem('dizimos', JSON.stringify(dizimos));
}

function configurarBanco() {
    if (!localStorage.getItem('bancoConfigurado')) {
        localStorage.setItem('bancoConfigurado', 'true');
        salvarDados();
    }
}

function getProximoId() {
    if (dizimos.length === 0) return 1;
    return Math.max(...dizimos.map(d => d.id)) + 1;
}