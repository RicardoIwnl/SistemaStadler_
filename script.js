document.addEventListener('DOMContentLoaded', () => {

    const sections = {
        companyForm: document.getElementById('company-form-section'),
        partnersForm: document.getElementById('partners-form-section'),
        partnersList: document.getElementById('partners-list'),
        companiesList: document.getElementById('companies-list'),
        obligationsForm: document.getElementById('obligations-form-section'),
        obligationsList: document.getElementById('obligations-list')
    };

    const tables = {
        partnersTable: 'partners-table-body',
        companiesTable: 'companies-table-body',
        obligationsTable: 'obligations-table-body'
    };

    document.getElementById('category-company').addEventListener('click', () => showSection(sections.companiesList));
    document.getElementById('subcategory-socios').addEventListener('click', () => showSection(sections.partnersList));
    document.getElementById('category-finance').addEventListener('click', toggleFinanceSubcategories);
    document.getElementById('category-obligations').addEventListener('click', () => showSection(sections.obligationsList));

    document.getElementById('subcategory-honorarios').addEventListener('click', () => showSection(sections.partnersForm));

    function showSection(section) {
        hideAllSections();
        section.style.display = 'block';
    }

    function hideAllSections() {
        Object.values(sections).forEach(section => section.style.display = 'none');
    }

    function toggleFinanceSubcategories() {
        document.getElementById('finance-subcategories').classList.toggle('show');
    }

    sections.companyForm.querySelector('form').addEventListener('submit', (e) => handleFormSubmit(e, validateCompanyForm, tables.companiesTable));
    sections.partnersForm.querySelector('form').addEventListener('submit', (e) => handleFormSubmit(e, validatePartnersForm, tables.partnersTable));
    sections.obligationsForm.querySelector('form').addEventListener('submit', (e) => handleFormSubmit(e, validateObligationsForm, tables.obligationsTable));

    function handleFormSubmit(event, validationFunction, tableId) {
        event.preventDefault();
        if (validationFunction()) {
            addEntity(event.target, tableId);
            event.target.reset();
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    }

    function validateCompanyForm() {
        const formData = new FormData(sections.companyForm.querySelector('form'));
        const patterns = {
            cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
            postalCode: /^\d{5}-\d{3}$/
        };

        return formData.get('company-name').length >= 3 &&
            formData.get('company-legal-name').length >= 3 &&
            patterns.cnpj.test(formData.get('company-cnpj')) &&
            formData.get('company-address').length >= 5 &&
            formData.get('company-city').length >= 2 &&
            formData.get('company-state').length >= 2 &&
            patterns.postalCode.test(formData.get('company-postal-code'));
    }

    function validatePartnersForm() {
        const formData = new FormData(sections.partnersForm.querySelector('form'));

        return formData.get('partner-name').length >= 3 &&
            validateEmail(formData.get('partner-email')) &&
            formData.get('partner-phone').length >= 10 &&
            formData.get('partner-cpf').length >= 11 &&
            formData.get('partner-rg').length >= 8;
    }

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function validateObligationsForm() {
        const formData = new FormData(sections.obligationsForm.querySelector('form'));

        return formData.get('obligation-name').length >= 3 &&
            formData.get('obligation-department').length >= 3 &&
            formData.get('obligation-responsible').length >= 3 &&
            formData.get('obligation-delivery-month').length >= 3 &&
            !isNaN(formData.get('obligation-reminder-days')) &&
            formData.get('obligation-reminder-type').length >= 3 &&
            formData.get('obligation-competencies').length >= 3;
    }

    function addEntity(form, tableId) {
        const formData = new FormData(form);
        const entity = {};

        formData.forEach((value, key) => {
            entity[key] = value;
        });

        if (form.id === 'partners-form') {
            entity['partner-legal-representative'] = form.querySelector('#partner-legal-representative').checked ? 'Sim' : 'Não';
        }
        if (form.id === 'obligations-form') {
            entity['obligation-active'] = form.querySelector('#obligation-active').checked ? 'Sim' : 'Não';
        }

        appendToTable(entity, tableId);
    }

    function appendToTable(item, tableId) {
        const tableBody = document.getElementById(tableId);
        const row = tableBody.insertRow();

        Object.values(item).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `<button onclick="editEntity(this)">Editar</button><button onclick="deleteEntity(this)">Excluir</button>`;
    }

    window.editEntity = (button) => {
        alert('Calma porra, eu ja coloco essa função');
    };

    window.deleteEntity = (button) => {
        const row = button.parentElement.parentElement;
        row.remove();
    };

    window.searchPartner = () => searchTable('search-partner-name', tables.partnersTable);
    window.searchCompany = () => searchTable('search-company-name', tables.companiesTable);
    window.searchObligation = () => searchTable('search-obligation-name', tables.obligationsTable);

    function searchTable(inputId, tableId) {
        const searchTerm = document.getElementById(inputId).value.toLowerCase();
        const rows = document.querySelectorAll(`#${tableId} tr`);
        rows.forEach(row => {
            const cells = Array.from(row.cells);
            const match = cells.some(cell => cell.textContent.toLowerCase().includes(searchTerm));
            row.style.display = match ? '' : 'none';
        });
    }

    window.showPartnerForm = () => showSection(sections.partnersForm);
    window.showCompanyForm = () => showSection(sections.companyForm);
    window.showObligationForm = () => showSection(sections.obligationsForm);

    document.getElementById('import-data').addEventListener('click', () => document.getElementById('file-input').click());
    document.getElementById('file-input').addEventListener('change', handleFileImport);

    function handleFileImport(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => processImport(e.target.result);
            reader.readAsText(file);
        }
    }

    function processImport(contents) {
        console.log('Dados importados:', contents);
    }

    window.exportCompanies = () => exportToCSV(tables.companiesTable, 'empresas.csv');
    window.exportPartners = () => exportToCSV(tables.partnersTable, 'sócios.csv');
    window.exportObligations = () => exportToCSV(tables.obligationsTable, 'obrigações.csv');

    function exportToCSV(tableId, filename) {
        const rows = Array.from(document.querySelectorAll(`#${tableId} tr`));
        const csvContent = rows.map(row => {
            return Array.from(row.cells).map(cell => {
                return `"${cell.textContent.replace(/"/g, '""')}"`;
            }).join(',');
        }).join('\r\n');

        const encodedUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

});
