export const sections = {
    companyForm: document.getElementById('company-form-section'),
    partnersForm: document.getElementById('partners-form-section'),
    partnersList: document.getElementById('partners-list'),
    companiesList: document.getElementById('companies-list'),
    obligationsForm: document.getElementById('obligations-form-section'),
    obligationsList: document.getElementById('obligations-list'),
};

export function showSection(section) {
    hideAllSections();
    section.classList.remove('hidden');
}

export function hideAllSections() {
    Object.values(sections).forEach(section => section.classList.add('hidden'));
}

export function showAlert(message, type = 'success') {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
}

//GERENCIA A EXIBIÇÃO DE NAVEGAÇÃO DAS SEÇÕES DA INTERFACE