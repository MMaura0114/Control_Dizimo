📊 Sistema Integrado de Gestão de Dízimos e Contas

📝 Descrição

Sistema desenvolvido para facilitar a gestão financeira de comunidades religiosas, com foco no controle de dízimos e prestação de contas.

Desenvolvido por: Maria Maura Reis, estudante de Análise e Desenvolvimento de Sistemas.

🚀 Funcionalidades

# 1. Gestão de Dízimos
   
✅ Cadastro de membros (com número de cadastro único)

✅ Registro de dízimos com:

Data de devolução

Valor

Forma de pagamento (PIX, Dinheiro, Cartão, Transferência, Outro)

Meses de referência (para dízimos atrasados)

Pagamento duplo (ex: Dinheiro + PIX)

✅ Consulta de membros com histórico de dízimos

✅ Relatório completo com total arrecadado

✅ Edição e exclusão de registros individuais

✅ Exportação para CSV

✅ Limpeza total do banco de dados

# 2. Prestação de Contas

✅ Controle de saldo anterior

✅ Registro de entradas:

Dízimo, Coleta, Coletas Especiais

Doações, OVS, Rádio Excelsior

Intenções, Saque, Promoções

Saldo de Festa do Padeiro

✅ Registro de saídas:

Repasses (Cúria, Administração Paroquial, Coleta)

Depósito, Alimentação, Contas (Embasa, Coelba)

Consertos, Decoração, Diarista

Manutenção, Materiais, Mão de Obra

Transporte e outras saídas

✅ Cálculo automático do saldo atual

✅ Resumo detalhado do caixa

# 3. 📁 Estrutura do Projeto
text
projeto/
├── index.html              # Página principal
├── style.css               # Estilos CSS
├── README.md               # Este arquivo
└── js/
    ├── database.js         # Gerenciamento do banco de dados (localStorage)
    ├── utils.js            # Funções utilitárias
    ├── dizimos.js          # Funções de dízimos (cadastro, consulta, relatório)
    ├── contas.js           # Funções de prestação de contas
    ├── modal.js            # Modal de edição/exclusão
    └── main.js             # Inicialização do sistema
    
# 4. 🛠️ Tecnologias Utilizadas

HTML5 - Estrutura da página

CSS3 - Estilização e responsividade

JavaScript (Vanilla) - Lógica do sistema

localStorage - Armazenamento persistente dos dados

# 5.📦 Instalação e Execução

Pré-requisitos
Navegador web moderno (Chrome, Firefox, Edge, etc.)

Editor de código (opcional, para edição)

Passos para executar
Clone ou baixe o projeto

bash
git clone [url-do-repositorio]

# ou baixe o ZIP e extraia

Abra o arquivo index.html

Navegue até a pasta do projeto

Clique duas vezes no arquivo index.html

Ou arraste para o navegador

O sistema já está pronto para uso!

Os dados são salvos automaticamente no localStorage do navegador

Não é necessário servidor ou banco de dados externo

# 6.💡 Como Usar

Cadastrar um Dízimo

Preencha os campos:

Meses de Referência: Mês(es) a que o dízimo se refere (ex: 03/2025)

Forma de Pagamento: Selecione a forma (PIX, Dinheiro, etc.)

Número de Cadastro: ID único do membro

Nome do Dizimista: Nome completo

Contato: Telefone ou email

Data/Mês de Devolução: Data do ato (formato DD/MM)

Valor: Valor do dízimo

# Para pagamento duplo:

Marque a opção "Pagamento dividido em duas formas"

Preencha as duas formas e valores

Exemplo: Dinheiro R100,00 + PIX R100,00 + PIXR 50,00

Clique em "Cadastrar e Registrar"

# Consultar Membro:

Digite o número de cadastro

Clique em "Consultar"

Visualize os dados e histórico do membro

# Gerar Relatório

Clique em "Emitir Relatório"

# Visualize:

Total arrecadado

Lista completa de dízimos

Resumo por forma de pagamento

# Ações disponíveis:

Editar: Altera o registro selecionado

Excluir: Remove o registro

# Exportar Dados:

Clique em "Exportar para CSV"

O arquivo será baixado automaticamente

Abra no Excel, Google Sheets ou outro editor

# Prestação de Contas

Preencha o saldo anterior

Preencha as entradas e saídas

Clique em "Calcular"

Visualize o resumo completo do caixa

Clique em "Limpar" para resetar os campos

# 7. ⚠️ Limitações e Observações

Importante:

Os dados são armazenados apenas no navegador (localStorage)

Não compartilhe o navegador entre diferentes usuários sem limpar os dados

Faça backup exportando para CSV regularmente

A edição de um dízimo não atualiza automaticamente os dados do membro

Pagamentos duplos são exibidos como "Forma 1 RX + Forma 2 RX

# 8. Navegadores Suportados:

✅ Google Chrome (recomendado)

✅ Mozilla Firefox

✅ Microsoft Edge

✅ Opera

✅ Safari

# 9. 🐛 Problemas Conhecidos

Problema	Solução
Dados não salvam	Verifique se o localStorage está habilitado no navegador
Modal não abre	Recarregue a página e tente novamente
Relatório não atualiza	Clique em "Emitir Relatório" novamente
Exportação não funciona	Verifique se há dados cadastrados

# 10. 📝 Licença

Este projeto é de uso livre para fins educacionais e comunitários.

🙏 Agradecimentos

Comunidade religiosa que inspirou o desenvolvimento


📞 Contato

Desenvolvedora: Maria Maura Reis
Curso: Bacharelado em Ciencias Exatas e Tecnologicas/Engenharia da Computaçao

Versão: 1.0
Última atualização: Julho 2026

