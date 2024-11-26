export function addEntityToTable(entity, tableId) {
    const tableBody = document.getElementById(tableId);
    const row = tableBody.insertRow();

    Object.values(entity).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = sanitizeInput(value);
    });

    const actionsCell = row.insertCell();
    actionsCell.innerHTML = `
        <button onclick="editEntity(this)">Editar</button>
        <button onclick="deleteEntity(this)">Excluir</button>`;
}

export function deleteEntity(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

export function searchTable(inputId, tableId) {
    const searchTerm = document.getElementById(inputId).value.toLowerCase();
    const rows = document.querySelectorAll(`#${tableId} tr`);

    rows.forEach(row => {
        const cells = Array.from(row.cells);
        const match = cells.some(cell => cell.textContent.toLowerCase().includes(searchTerm));
        row.style.display = match ? '' : 'none';
    });
}

function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}

//ADICIONA, EDITA E REMOVE DADOS DA TABELA CHINELÃO
