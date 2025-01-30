// Seleção de elementos do DOM
const addButton = document.getElementById('add-button');
const formContainer = document.getElementById('form-container');
const form = document.querySelector('form');
const table = document.querySelector('table');
const totalSpan = document.querySelector('h3 span');

// Variável para armazenar o total de despesas
let totalDespesas = 0;

// Função para exibir ou ocultar o formulário
addButton.addEventListener('click', (event) => {
    // Previne que o clique no botão feche o formulário
    event.stopPropagation();
    formContainer.classList.toggle('show');
});

// Função para adicionar uma nova despesa
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio do formulário
    
    // Pegando os valores dos campos
    const data = form.querySelector('input[type="text"]:nth-child(1)').value;
    const tipo = form.querySelector('input[type="text"]:nth-child(2)').value;
    const valor = parseFloat(form.querySelector('input[type="number"]').value);

    // Validação dos campos
    if (!data || !tipo || isNaN(valor) || valor <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Criando uma nova linha para a tabela
    const newRow = document.createElement('tr');

    // Criando as células para a nova despesa
    const dataCell = document.createElement('td');
    dataCell.textContent = data;
    
    const tipoCell = document.createElement('td');
    tipoCell.textContent = tipo;
    
    const valorCell = document.createElement('td');
    valorCell.textContent = `${valor.toFixed(2)}$`;

    // Adicionando as células à linha
    newRow.appendChild(dataCell);
    newRow.appendChild(tipoCell);
    newRow.appendChild(valorCell);

    // Criando botão de remoção
    const removeCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', () => {
        removeDespesa(newRow, valor);
    });
    removeCell.appendChild(removeButton);
    newRow.appendChild(removeCell);

    // Adicionando a nova linha à tabela
    table.appendChild(newRow);

    // Atualizar o total de despesas
    totalDespesas += valor;
    totalSpan.textContent = totalDespesas.toFixed(2);

    // Limpar o formulário
    form.reset();

    // Fechar o formulário após adicionar a despesa
    formContainer.classList.remove('show');
});

// Função para remover uma despesa
function removeDespesa(row, valor) {
    table.removeChild(row);
    totalDespesas -= valor;
    totalSpan.textContent = totalDespesas.toFixed(2);
}

// Função para fechar o formulário se o clique for fora dele
document.addEventListener('click', (event) => {
    // Verifica se o clique não foi no formulário ou no botão de adicionar despesa
    if (!formContainer.contains(event.target) && event.target !== addButton) {
        formContainer.classList.remove('show');
    }
});
