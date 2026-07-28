// ====================== DÍZIMOS ======================
function togglePagamentoDuplo() {
    const checked = document.getElementById('pagamento-duplo-check').checked;
    document.getElementById('pagamento-duplo-campos').style.display = checked ? 'block' : 'none';
    document.getElementById('forma-pagamento-simples').style.display = checked ? 'none' : 'block';
    document.getElementById('campo-valor-simples').style.display = checked ? 'none' : 'block';
}

function cadastrarMembroEDizimo() {
    const mesesReferencia = document.getElementById('meses-referencia').value.trim();
    const cadastro = parseInt(document.getElementById('cadastro').value);
    const nome = document.getElementById('nome').value.trim();
    const contato = document.getElementById('contato').value.trim();
    const dataDevolucao = document.getElementById('data-devolucao').value.trim();
    
    const pagamentoDuplo = document.getElementById('pagamento-duplo-check').checked;
    let formaPagamento = '';
    let valor = 0;
    
    if (pagamentoDuplo) {
        const forma1 = document.getElementById('forma-pagamento-1').value;
        const valor1 = parseCurrency(document.getElementById('valor-pagamento-1').value);
        const forma2 = document.getElementById('forma-pagamento-2').value;
        const valor2 = parseCurrency(document.getElementById('valor-pagamento-2').value);
        
        if (valor1 <= 0 && valor2 <= 0) {
            showResult('Informe pelo menos um valor para o pagamento duplo!', 'error');
            return;
        }
        if (valor1 > 0 && valor2 > 0 && forma1 === forma2) {
            showResult('As duas formas de pagamento devem ser diferentes!', 'error');
            return;
        }
        
        const partes = [];
        if (valor1 > 0) partes.push(`${forma1} R$ ${valor1.toFixed(2).replace('.', ',')}`);
        if (valor2 > 0) partes.push(`${forma2} R$ ${valor2.toFixed(2).replace('.', ',')}`);
        formaPagamento = partes.join(' + ');
        valor = valor1 + valor2;
    } else {
        formaPagamento = document.getElementById('forma-pagamento').value;
        valor = parseCurrency(document.getElementById('valor').value);
    }
    
    if (isNaN(cadastro) || cadastro <= 0 || !nome || valor <= 0 || !dataDevolucao) {
        showResult('Campos obrigatórios: Número de Cadastro (>0), Nome, Valor (>0) e Data/Mês de Devolução!', 'error');
        return;
    }
    if (!validarData(dataDevolucao)) {
        showResult('Formato da data inválido! Use DD/MM (ex: 15/06)', 'error');
        return;
    }
    
    // REMOVIDO: Não atualiza mais o membro automaticamente
    // Apenas verifica se o membro existe, se não existir, cria um NOVO
    const membroExistente = membros.find(m => m.cadastro === cadastro);
    if (!membroExistente) {
        // Cria novo membro APENAS se não existir
        membros.push({ cadastro, nome, contato });
        salvarDados();
    } else {
        // Se o membro já existe, NÃO atualiza os dados
        // Apenas informa que o membro existe
        showResult(`Membro ${membroExistente.nome} já cadastrado. Novo dízimo adicionado.`, 'info');
    }
    
    // Registrar dízimo (sempre adiciona um novo)
    const { dataRegistro, horaRegistro } = getDataHoraAtual();
    
    dizimos.push({
        id: getProximoId(),
        cadastro,
        valor,
        dataDevolucao,
        formaPagamento,
        mesesReferencia: mesesReferencia || '',
        dataRegistro,
        horaRegistro
    });
    
    salvarDados();
    
    // Limpar campos
    document.getElementById('meses-referencia').value = '';
    document.getElementById('cadastro').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('contato').value = '';
    document.getElementById('data-devolucao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('valor-pagamento-1').value = '0,00';
    document.getElementById('valor-pagamento-2').value = '0,00';
    document.getElementById('pagamento-duplo-check').checked = false;
    togglePagamentoDuplo();
    
    showResult(`Dízimo de R$ ${valor.toFixed(2).replace('.', ',')} registrado para ${nome} (cadastro ${cadastro}).`, 'success');
}

// As demais funções permanecem iguais...
function consultarMembro() {
    const cadastro = parseInt(document.getElementById('cadastroConsulta').value);
    if (isNaN(cadastro)) {
        showResult('Número de cadastro inválido!', 'error', 'resultConsulta');
        return;
    }
    const membro = membros.find(m => m.cadastro === cadastro);
    if (membro) {
        const dizimosMembro = dizimos.filter(d => d.cadastro === cadastro);
        const totalDizimos = dizimosMembro.reduce((sum, d) => sum + d.valor, 0);
        const resultDiv = document.getElementById('resultConsulta');
        resultDiv.innerHTML = `
            <h3>Dados do Membro</h3>
            <p><strong>Cadastro:</strong> ${membro.cadastro}</p>
            <p><strong>Nome:</strong> ${membro.nome}</p>
            <p><strong>Contato:</strong> ${membro.contato || 'Não informado'}</p>
            <p><strong>Total de Dízimos:</strong> R$ ${totalDizimos.toFixed(2).replace('.', ',')}</p>
            <p><strong>Últimos 5 Dízimos:</strong></p>
            <ul>${dizimosMembro.slice(-5).reverse().map(d => `<li>${d.dataDevolucao} - R$ ${d.valor.toFixed(2).replace('.', ',')} - ${d.formaPagamento} ${d.mesesReferencia ? `(Ref: ${d.mesesReferencia})` : ''}</li>`).join('')}</ul>
        `;
        resultDiv.style.display = 'block';
    } else {
        showResult('Membro não encontrado!', 'error', 'resultConsulta');
    }
}

function emitirRelatorio() {
    const total = dizimos.reduce((sum, d) => sum + d.valor, 0);
    let relatorioHTML = `<h3>Total arrecadado: R$ ${total.toFixed(2).replace('.', ',')}</h3>`;
    relatorioHTML += `<h4>Detalhes dos Dízimos (ordenados por Nº Cadastro crescente):</h4>`;
    
    if (dizimos.length === 0) {
        relatorioHTML += `<p>Nenhum dízimo registrado ainda.</p>`;
    } else {
        const dizimosOrdenados = [...dizimos].sort((a, b) => a.cadastro - b.cadastro);
        
        relatorioHTML += `<table>
            <thead>
                <tr>
                    <th>Meses Referência</th>
                    <th>Forma de Pagamento</th>
                    <th>Nº Cadastro</th>
                    <th>Nome</th>
                    <th>Data/Mês Devolução</th>
                    <th>Valor</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>`;
        
        for (const dizimo of dizimosOrdenados) {
            const membro = membros.find(m => m.cadastro === dizimo.cadastro);
            const nome = membro ? membro.nome : 'Membro não encontrado';
            const mesesRef = dizimo.mesesReferencia || '---';
            relatorioHTML += `
                <tr>
                    <td>${mesesRef}</td>
                    <td>${dizimo.formaPagamento}</td>
                    <td>${dizimo.cadastro}</td>
                    <td>${nome}</td>
                    <td>${dizimo.dataDevolucao}</td>
                    <td>R$ ${dizimo.valor.toFixed(2).replace('.', ',')}</td>
                    <td>
                        <div class="acao-botoes">
                            <button class="btn-editar" onclick="abrirModalEditar(${dizimo.id})">Editar</button>
                            <button class="btn-excluir" onclick="excluirDireto(${dizimo.id})">Excluir</button>
                        </div>
                    </td>
                </tr>
            `;
        }
        relatorioHTML += `</tbody></table>`;
        
        // Resumo por forma de pagamento
        const resumoPagamento = {};
        dizimos.forEach(d => {
            if (d.formaPagamento.includes(' + ')) {
                const partes = d.formaPagamento.split(' + ');
                partes.forEach(part => {
                    const forma = part.split(' R$ ')[0];
                    const valorPart = parseCurrency(part.split(' R$ ')[1]);
                    resumoPagamento[forma] = (resumoPagamento[forma] || 0) + valorPart;
                });
            } else {
                resumoPagamento[d.formaPagamento] = (resumoPagamento[d.formaPagamento] || 0) + d.valor;
            }
        });
        relatorioHTML += `<h4>Resumo por Forma de Pagamento:</h4><table><thead><tr><th>Forma de Pagamento</th><th>Total</th></tr></thead><tbody>`;
        for (const [forma, totalForma] of Object.entries(resumoPagamento)) {
            relatorioHTML += `<tr><td>${forma}</td><td>R$ ${totalForma.toFixed(2).replace('.', ',')}</td></tr>`;
        }
        relatorioHTML += `</tbody></table>`;
    }
    document.getElementById('relatorio').innerHTML = relatorioHTML;
    showResult('Relatório gerado com sucesso!', 'success');
}

function exportarParaExcel() {
    if (dizimos.length === 0 && membros.length === 0) {
        showResult('Nenhum dado para exportar!', 'error');
        return;
    }
    if (!confirm('Exportar dados para arquivo CSV? As colunas serão: Meses referência, Forma de Pagamento, Número de Cadastro, Nome, Data/Mês de Devolução, Valor.')) return;
    
    const dizimosOrdenados = [...dizimos].sort((a, b) => a.cadastro - b.cadastro);
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Meses referência;Forma de Pagamento;Número de Cadastro;Nome;Data/Mês de Devolução;Valor (R$)\r\n";
    
    for (const dizimo of dizimosOrdenados) {
        const membro = membros.find(m => m.cadastro === dizimo.cadastro);
        const nome = membro ? membro.nome : 'Membro não encontrado';
        const mesesRef = dizimo.mesesReferencia ? dizimo.mesesReferencia.replace(/;/g, ',') : '';
        const valorFormatado = dizimo.valor.toFixed(2).replace('.', ',');
        csvContent += `"${mesesRef}";"${dizimo.formaPagamento}";${dizimo.cadastro};"${nome}";"${dizimo.dataDevolucao}";${valorFormatado}\r\n`;
    }
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dizimos_relatorio.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showResult('Dados exportados para CSV com sucesso!', 'success');
}

function limparBanco() {
    if (!confirm('ATENÇÃO: Tem certeza que deseja limpar TODOS os dados?\nEsta ação não pode ser desfeita e todos os registros serão perdidos.')) return;
    if (!confirm('CONFIRMAÇÃO FINAL: Deseja realmente limpar todos os dados?')) return;
    membros = [];
    dizimos = [];
    salvarDados();
    document.getElementById('relatorio').innerHTML = '';
    showResult('Banco de dados limpo com sucesso.', 'success');
}

function excluirDireto(id) {
    if (!confirm('Tem certeza que deseja excluir este registro permanentemente?')) return;
    const index = dizimos.findIndex(d => d.id === id);
    if (index !== -1) {
        dizimos.splice(index, 1);
        salvarDados();
        emitirRelatorio();
        showResult('Registro excluído com sucesso!', 'success');
    }
}