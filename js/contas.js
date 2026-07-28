// ====================== PRESTAÇÃO DE CONTAS ======================
const entradaCampos = ["Dízimo","Coleta","Coletas Especiais","Doação (Dizimista sem LGPD)","Doações","OVS","Rádio Excelsior","Intenções","Saque","Promoções","Saldo de Festa do Padeiro"];
const saidaCampos = ["Repasse Cúria (15% do Dízimo)","Administração Paroquial (70% do Dízimo)","Repasse da Coleta (40%)","Coletas Especiais (100%)","Doação (Dizimista sem LGPD)","OVS (100%)","Rádio Excelsior (100%)","Repasse Intenções (100%)","Depósito","Alimentação Geral","Conta da Embasa","Conta da Coelba","Conserto de Equipamento","Decoração (Flores)","Diarista","Manutenção de Culto","Material de Construção","Material de Limpeza/Higiene","Material Litúrgico","Mão de Obra","Repasse de Espórtula","Transporte","Outras Saídas"];

function inicializarContas() {
    const entradasContainer = document.getElementById('entradas-container');
    entradaCampos.forEach(nome => {
        const div = document.createElement('div');
        div.className = 'accounting-form-group';
        div.innerHTML = `<label for="entrada-${nome}">${nome}:</label><div class="currency-input"><input type="text" id="entrada-${nome}" placeholder="0,00" value="0,00" onblur="formatCurrency(this)"></div>`;
        entradasContainer.appendChild(div);
    });
    
    const saidasContainer = document.getElementById('saidas-container');
    saidaCampos.forEach(nome => {
        const div = document.createElement('div');
        div.className = 'accounting-form-group';
        div.innerHTML = `<label for="saida-${nome}">${nome}:</label><div class="currency-input"><input type="text" id="saida-${nome}" placeholder="0,00" value="0,00" onblur="formatCurrency(this)"></div>`;
        saidasContainer.appendChild(div);
    });
    
    document.getElementById('accounting-calcular').addEventListener('click', calcularContas);
    document.getElementById('accounting-limpar').addEventListener('click', limparContas);
}

function calcularContas() {
    const saldoAnterior = parseCurrency(document.getElementById('saldo-anterior').value);
    let totalEntrada = 0, entradas = {};
    entradaCampos.forEach(nome => { const v = parseCurrency(document.getElementById(`entrada-${nome}`).value); entradas[nome]=v; totalEntrada+=v; });
    let totalSaida = 0, saidas = {};
    const dizimo = entradas["Dízimo"] || 0, coleta = entradas["Coleta"] || 0;
    saidas["Repasse Cúria (15% do Dízimo)"] = dizimo*0.15;
    saidas["Administração Paroquial (70% do Dízimo)"] = dizimo*0.70;
    saidas["Repasse da Coleta (40%)"] = coleta*0.40;
    saidas["Coletas Especiais (100%)"] = entradas["Coletas Especiais"]||0;
    saidas["OVS (100%)"] = entradas["OVS"]||0;
    saidas["Rádio Excelsior (100%)"] = entradas["Rádio Excelsior"]||0;
    saidas["Repasse Intenções (100%)"] = entradas["Intenções"]||0;
    saidaCampos.forEach(nome => { if(!(nome in saidas)) { const v = parseCurrency(document.getElementById(`saida-${nome}`).value); saidas[nome]=v; } totalSaida += saidas[nome]; });
    const saldoAtual = (saldoAnterior + totalEntrada) - totalSaida;
    let resumo = "RESUMO DO CAIXA\n========================================\n";
    resumo += `SALDO ANTERIOR: R$ ${saldoAnterior.toFixed(2).replace('.',',')}\nTOTAL RECEITA: R$ ${totalEntrada.toFixed(2).replace('.',',')}\nTOTAL SAÍDA: R$ ${totalSaida.toFixed(2).replace('.',',')}\nSALDO ATUAL: R$ ${saldoAtual.toFixed(2).replace('.',',')}\n========================================\n\nDETALHES ENTRADAS:\n`;
    for(const [nome,valor] of Object.entries(entradas)) if(valor>0) resumo += `${nome}: R$ ${valor.toFixed(2).replace('.',',')}\n`;
    resumo += "\nDETALHES SAÍDAS:\n";
    for(const [nome,valor] of Object.entries(saidas)) if(valor>0) resumo += `${nome}: R$ ${valor.toFixed(2).replace('.',',')}\n`;
    document.getElementById('saldo-anterior').value = saldoAtual.toFixed(2).replace('.',',');
    document.getElementById('resumo').value = resumo;
}

function limparContas() {
    if(confirm('Limpar todos os campos da prestação de contas?')){
        entradaCampos.forEach(nome => document.getElementById(`entrada-${nome}`).value = "0,00");
        saidaCampos.forEach(nome => document.getElementById(`saida-${nome}`).value = "0,00");
        document.getElementById('resumo').value = "";
    }
}