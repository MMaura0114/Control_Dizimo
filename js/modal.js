// ====================== MODAL ======================
let editandoId = null;

function abrirModalEditar(id) {
    const dizimo = dizimos.find(d => d.id === id);
    if (!dizimo) {
        showResult('Registro não encontrado!', 'error');
        return;
    }
    editandoId = id;
    document.getElementById('modal-id').value = id;
    
    const membro = membros.find(m => m.cadastro === dizimo.cadastro);
    document.getElementById('modal-nome').value = membro ? membro.nome : '';
    document.getElementById('modal-cadastro').value = dizimo.cadastro;
    document.getElementById('modal-contato').value = membro ? membro.contato || '' : '';
    document.getElementById('modal-data').value = dizimo.dataDevolucao;
    document.getElementById('modal-valor').value = dizimo.valor.toFixed(2).replace('.', ',');
    document.getElementById('modal-forma-pagamento').value = dizimo.formaPagamento.includes(' + ') ? 'PIX' : dizimo.formaPagamento;
    document.getElementById('modal-meses').value = dizimo.mesesReferencia || '';
    
    if (dizimo.formaPagamento.includes(' + ')) {
        document.getElementById('modal-forma-pagamento').disabled = true;
        document.getElementById('modal-forma-pagamento').style.opacity = '0.6';
        const aviso = document.createElement('small');
        aviso.id = 'aviso-pagamento-duplo';
        aviso.style.display = 'block';
        aviso.style.color = '#e67e22';
        aviso.textContent = `⚠️ Este registro tem pagamento duplo: ${dizimo.formaPagamento}. A forma de pagamento não pode ser editada individualmente.`;
        const grupo = document.querySelector('#modal-forma-pagamento').parentElement;
        const antigo = document.getElementById('aviso-pagamento-duplo');
        if (antigo) antigo.remove();
        grupo.appendChild(aviso);
    } else {
        document.getElementById('modal-forma-pagamento').disabled = false;
        document.getElementById('modal-forma-pagamento').style.opacity = '1';
        const antigo = document.getElementById('aviso-pagamento-duplo');
        if (antigo) antigo.remove();
    }
    
    document.getElementById('modal-titulo').textContent = 'Editar Registro';
    document.getElementById('modal-editar').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Impede scroll da página
}

function fecharModal() {
    document.getElementById('modal-editar').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura scroll
    editandoId = null;
}

function salvarEdicao() {
    const id = parseInt(document.getElementById('modal-id').value);
    const nome = document.getElementById('modal-nome').value.trim();
    const cadastro = parseInt(document.getElementById('modal-cadastro').value);
    const contato = document.getElementById('modal-contato').value.trim();
    const dataDevolucao = document.getElementById('modal-data').value.trim();
    const valor = parseCurrency(document.getElementById('modal-valor').value);
    const formaPagamento = document.getElementById('modal-forma-pagamento').value;
    const mesesReferencia = document.getElementById('modal-meses').value.trim();
    
    if (!nome || isNaN(cadastro) || cadastro <= 0 || valor <= 0 || !dataDevolucao) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }
    if (!validarData(dataDevolucao)) {
        alert('Formato de data inválido! Use DD/MM.');
        return;
    }
    
    const indexDizimo = dizimos.findIndex(d => d.id === id);
    if (indexDizimo === -1) {
        alert('Registro não encontrado!');
        return;
    }
    
    // ATUALIZAR SOMENTE O REGISTRO SELECIONADO - NÃO ATUALIZA MEMBROS
    const dizimoOriginal = dizimos[indexDizimo];
    if (dizimoOriginal.formaPagamento.includes(' + ')) {
        dizimos[indexDizimo] = {
            ...dizimos[indexDizimo],
            cadastro,
            valor,
            dataDevolucao,
            mesesReferencia,
        };
    } else {
        dizimos[indexDizimo] = {
            ...dizimos[indexDizimo],
            cadastro,
            valor,
            dataDevolucao,
            formaPagamento,
            mesesReferencia,
        };
    }
    
    // NÃO ATUALIZA O MEMBRO - apenas mantém os dados do membro existente
    // Verifica se o membro existe, se não existe, NÃO CRIA
    const membroExistente = membros.find(m => m.cadastro === cadastro);
    if (!membroExistente) {
        // Se o cadastro não existe, mantém o cadastro original do dízimo
        const membroOriginal = membros.find(m => m.cadastro === dizimoOriginal.cadastro);
        if (membroOriginal) {
            // Mantém o cadastro original
            dizimos[indexDizimo].cadastro = dizimoOriginal.cadastro;
        }
        alert('Número de cadastro inválido! Mantido o cadastro original.');
        return;
    }
    
    salvarDados();
    fecharModal();
    emitirRelatorio();
    showResult('Registro atualizado com sucesso!', 'success');
}

function excluirRegistro() {
    const id = parseInt(document.getElementById('modal-id').value);
    if (!confirm('Tem certeza que deseja excluir este registro permanentemente?')) return;
    
    const index = dizimos.findIndex(d => d.id === id);
    if (index !== -1) {
        dizimos.splice(index, 1);
        salvarDados();
        fecharModal();
        emitirRelatorio();
        showResult('Registro excluído com sucesso!', 'success');
    }
}

// Fechar modal com clique fora
window.onclick = function(event) {
    const modal = document.getElementById('modal-editar');
    if (event.target === modal) {
        fecharModal();
    }
};

// Fechar modal com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharModal();
    }
});