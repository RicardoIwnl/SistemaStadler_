document.getElementById('category-company').addEventListener('click', () => showSection(sections.companiesList));
document.getElementById('subcategory-socios').addEventListener('click', () => showSection(sections.partnersList));
document.getElementById('category-obligations').addEventListener('click', () => showSection(sections.obligationsList));

document.getElementById('add-company').addEventListener('click', () => addEntity('company'));
document.getElementById('add-partner').addEventListener('click', () => addEntity('partner'));
document.getElementById('add-obligation').addEventListener('click', () => addEntity('obligation'));

const sections = {
    companiesList: document.getElementById('companies-list'),
    partnersList: document.getElementById('partners-list'),
    obligationsList: document.getElementById('obligations-list'),
    formCompany: document.getElementById('form-company'),
    formPartner: document.getElementById('form-partner'),
    formObligation: document.getElementById('form-obligation'),
};

function showSection(section) {
    for (const key in sections) {
        sections[key].classList.add('hidden');
    }
    section.classList.remove('hidden');
}

function addEntity(type) {
    let entity = {};
    let tableId = '';

    switch (type) {
        case 'company':
            entity = {
                name: document.getElementById('company-name').value,
                legalName: document.getElementById('company-legal-name').value,
                cnpj: document.getElementById('company-cnpj').value,
                address: document.getElementById('company-address').value,
                city: document.getElementById('company-city').value,
                state: document.getElementById('company-state').value,
                postalCode: document.getElementById('company-postal-code').value,
            };
            tableId = 'companies-table-body';
            break;
        case 'partner':
            entity = {
                name: document.getElementById('partner-name').value,
                document: document.getElementById('partner-document').value,
                position: document.getElementById('partner-position').value,
            };
            tableId = 'partners-table-body';
            break;
        case 'obligation':
            entity = {
                description: document.getElementById('obligation-description').value,
                deadline: document.getElementById('obligation-deadline').value,
            };
            tableId = 'obligations-table-body';
            break;
    }

    if (validateEntity(entity)) {
        appendToTable(entity, tableId);
    }
}

function validateEntity(entity) {
    return Object.values(entity).every(value => value.trim() !== '');
}

function appendToTable(item, tableId) {
    const tableBody = document.getElementById(tableId);
    const row = tableBody.insertRow();
    Object.values(item).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
    });

    
    const actionsCell = row.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => row.remove());
    actionsCell.appendChild(deleteButton);
}

function searchTable(inputId, tableId) {
    const searchTerm = document.getElementById(inputId).value.toLowerCase();
    const rows = document.querySelectorAll(`#${tableId} tr`);
    rows.forEach(row => {
        const cells = Array.from(row.cells);
        const match = cells.some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = match ? '' : 'none';
    });
}

window.searchPartner = () => searchTable('search-partner-name', 'partners-table-body');
window.searchCompany = () => searchTable('search-company-name', 'companies-table-body');
window.searchObligation = () => searchTable('search-obligation-name', 'obligations-table-body');

function handleFileImport(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => processImport(e.target.result);
        reader.readAsText(file);
    }
}

function processImport(contents) {
    const rows = contents.split('\n').map(row => row.split(','));
    rows.forEach(row => {
        const [name, legalName, cnpj, address, city, state, postalCode] = row;
        const entity = { name, legalName, cnpj, address, city, state, postalCode };
        appendToTable(entity, 'companies-table-body');
    });
}

function exportToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    let csvContent = '';

    
    const headers = Array.from(table.querySelectorAll('thead th'))
        .map(th => th.textContent)
        .join(',');
    csvContent += headers + '\n';

    
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const values = Array.from(row.querySelectorAll('td'))
            .map(td => td.textContent)
            .join(',');
        csvContent += values + '\n';
    });

    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.exportCompanies = () => exportToCSV('companies-table-body', 'companies.csv');
window.exportPartners = () => exportToCSV('partners-table-body', 'partners.csv');
window.exportObligations = () => exportToCSV('obligations-table-body', 'obligations.csv');

function appendToTable(item, tableId) {
    const tableBody = document.getElementById(tableId);
    const row = tableBody.insertRow();
    
    Object.values(item).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
    });

    const actionCell = row.insertCell();
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    actionCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    actionCell.appendChild(deleteButton);
}
document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new FormData(this);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email')
    };       

    fetch('/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
});

