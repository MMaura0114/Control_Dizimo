// ====================== UTILS ======================
function formatCurrency(input) {
    let value = input.value.replace(/[^\d,]/g, '');
    const commaCount = value.split(',').length - 1;
    if (commaCount > 1) value = value.replace(/,/g, (match, offset) => offset === value.lastIndexOf(',') ? match : '');
    let [integerPart, decimalPart = ''] = value.split(',');
    integerPart = integerPart.replace(/^0+/, '') || '0';
    decimalPart = decimalPart.substring(0, 2);
    value = integerPart + (decimalPart ? ',' + decimalPart : ',00');
    input.value = value;
}

function parseCurrency(value) {
    if (!value) return 0;
    return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
}

function validarData(data) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/;
    return regex.test(data);
}

function showResult(message, type = 'info', elementId = 'result') {
    const resultDiv = document.getElementById(elementId);
    resultDiv.textContent = message;
    resultDiv.className = type;
    resultDiv.style.display = 'block';
    if (elementId === 'result') setTimeout(() => resultDiv.style.display = 'none', 5000);
}

function openTab(tabName) {
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) tabContents[i].classList.remove('active');
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

function getDataHoraAtual() {
    const agora = new Date();
    const dataRegistro = `${agora.getDate().toString().padStart(2,'0')}/${(agora.getMonth()+1).toString().padStart(2,'0')}/${agora.getFullYear()}`;
    const horaRegistro = `${agora.getHours().toString().padStart(2,'0')}:${agora.getMinutes().toString().padStart(2,'0')}:${agora.getSeconds().toString().padStart(2,'0')}`;
    return { dataRegistro, horaRegistro };
}