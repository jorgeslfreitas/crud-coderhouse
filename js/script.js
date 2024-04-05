'use strict'

const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}

//CRUD---------------------------------------------------------------------------------------------------------
const setLocalStorage = (dbClient) => localStorage.setItem('db', JSON.stringify(dbClient));
const getLocalStorage = () => JSON.parse(localStorage.getItem('db')) ?? [];

//CREATE
const creatClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
};

//READ
const readClient = () => getLocalStorage();

//UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient)
};

//DELETE
const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
    updateTable();
}

const isValidsFields = () => {
    return document.getElementById('form').reportValidity();
}

const clearFields = () => {
    const campos = document.querySelectorAll('.modal-field');
    campos.forEach(campo => campo.value = '');
}


const saveClient = () => {
    if (isValidsFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        creatClient(client);
        updateTable();
        closeModal();
    }
}


const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">editar</button>
            <button type="button" class="button red" id="delete-${index}">excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
}

const editClient = (index) => {
    const client = readClient()[index];
    fillFields(client);
    openModal();
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('cidade').value = client.cidade;
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-');

        if (action == 'edit') {
            editClient(index);
            console.log('teste edit')
        } else {
            deleteClient(index);
        }
    }
}

updateTable();

//Eventos modal
document.getElementById('cadastrarCliente').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('salvar').addEventListener('click', saveClient);

document.getElementById('cancelar').addEventListener('click', closeModal);

document.querySelector('#tableClient>tbody').addEventListener('click', editDelete);




