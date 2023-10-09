// Função para validar CPF
function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf == '') return false;

    // Verifica se o CPF tem 11 caracteres e não é uma sequência de números iguais
    if (cpf.length != 11 || /^(.)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    // Verifica o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) {
        resto = 0;
    }

    if (resto != parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    // Verifica o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) {
        resto = 0;
    }

    if (resto != parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// Seleciona elementos DOM
const cpfForm = document.getElementById('cpfForm');
const modal = document.getElementById('myModal');
const closeModal = document.getElementById('closeModal');

// Função para abrir o modal
function openModal() {
    modal.style.display = 'flex';
}

// Função para fechar o modal
function closeModalFunction() {
    modal.style.display = 'none';
}

// Evento de envio do formulário
cpfForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const cpfInput = document.getElementById('cpf');
    const cpfValue = cpfInput.value;

    if (validaCPF(cpfValue)) {
        openModal();
    } else {
        alert('CPF inválido. Por favor, insira um CPF válido.');
    }
});

// Evento para fechar o modal ao clicar no botão "X"
closeModal.addEventListener('click', closeModalFunction);

// Evento para fechar o modal ao clicar fora dele
window.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModalFunction();
    }
});