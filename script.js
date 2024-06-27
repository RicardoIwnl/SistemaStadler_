document.addEventListener('DOMContentLoaded', () => {
    const companyForm = document.getElementById('company-form-section');
    const partnersForm = document.getElementById('partners-form-section');
    const partnersList = document.getElementById('partners-list');
    const companiesList = document.getElementById('companies-list');
    const obligationsForm = document.getElementById('obligations-form-section');
    const obligationsList = document.getElementById('obligations-list');

    document.getElementById('category-company').addEventListener('click', () => {
        showSection(companiesList);
    });

    document.getElementById('subcategory-socios').addEventListener('click', () => {
        showSection(partnersList);
    });

    document.getElementById('category-finance').addEventListener('click', () => {
        document.getElementById('finance-subcategories').classList.toggle('show');
    });

    document.getElementById('subcategory-honorarios').addEventListener('click', () => {
        showSection(partnersForm);
    });

    document.getElementById('category-obligations').addEventListener('click', () => {
        showSection(obligationsList);
    });

    function showSection(section) {
        hideAllSections();
        section.style.display = 'block';
    }

    function hideAllSections() {
        const sections = document.querySelectorAll('.form-container, .list-container');
        sections.forEach(section => section.style.display = 'none');
    }

    companyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addEntity(companyForm, 'companies-table-body');
    });

    partnersForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addEntity(partnersForm, 'partners-table-body');
    });

    obligationsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addEntity(obligationsForm, 'obligations-table-body');
    });

    function addEntity(form, tableId) {
        const entity = {};
        new FormData(form).forEach((value, key) => {
            entity[key] = value;
        });
        if (form.id === 'partners-form' && form.querySelector('#partner-legal-representative').checked) {
            entity['legalRepresentative'] = true;
        }
        appendToTable(entity, tableId);
        form.reset();
    }

    function appendToTable(item, tableId) {
        const tableBody = document.getElementById(tableId);
        const row = tableBody.insertRow();
        for (const key in item) {
            const cell = row.insertCell();
            cell.textContent = item[key];
        }
        const actionsCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => row.remove());
        actionsCell.appendChild(deleteButton);
    }

    window.searchPartner = function() {
        const searchTerm = document.getElementById('search-partner-name').value.toLowerCase();
        filterTable('partners-table-body', searchTerm);
    };

    window.searchCompany = function() {
        const searchTerm = document.getElementById('search-company-name').value.toLowerCase();
        filterTable('companies-table-body', searchTerm);
    };

    window.searchObligation = function() {
        const searchTerm = document.getElementById('search-obligation-description').value.toLowerCase();
        filterTable('obligations-table-body', searchTerm);
    };

    function filterTable(tableId, searchTerm) {
        const rows = document.querySelectorAll(`#${tableId} tr`);
        rows.forEach(row => {
            const cells = Array.from(row.cells);
            const match = cells.some(cell => cell.textContent.toLowerCase().includes(searchTerm));
            row.style.display = match ? '' : 'none';
        });
    }

    window.showPartnerForm = function() {
        showSection(partnersForm);
    };

    window.showCompanyForm = function() {
        showSection(companyForm);
    };

    window.showObligationForm = function() {
        showSection(obligationsForm);
    };

    document.getElementById('import-data').addEventListener('click', function() {
        document.getElementById('file-input').click();
    });

    document.getElementById('file-input').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            // Handle file import logic here
        }
    });

    function exportToCSV(data, filename) {
        const csvContent = data.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    window.exportCompanies = function() {
        const table = document.getElementById('companies-table-body');
        const data = Array.from(table.rows).map(row => Array.from(row.cells).map(cell => cell.textContent));
        exportToCSV(data, 'empresas.csv');
    };

    window.exportPartners = function() {
        const table = document.getElementById('partners-table-body');
        const data = Array.from(table.rows).map(row => Array.from(row.cells).map(cell => cell.textContent));
        exportToCSV(data, 'socios.csv');
    };

    window.exportObligations = function() {
        const table = document.getElementById('obligations-table-body');
        const data = Array.from(table.rows).map(row => Array.from(row.cells).map(cell => cell.textContent));
        exportToCSV(data, 'obrigacoes.csv');
    };
});
