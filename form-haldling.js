export function validateCompanyForm(form) {
    const formData = new FormData(form);
    const patterns = {
        cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
        postalCode: /^\d{5}-\d{3}$/,
    };

    return formData.get('company-name').length >= 3 &&
        formData.get('company-legal-name').length >= 3 &&
        patterns.cnpj.test(formData.get('company-cnpj')) &&
        formData.get('company-address').length >= 5 &&
        formData.get('company-city').length >= 2 &&
        formData.get('company-state').length >= 2 &&
        patterns.postalCode.test(formData.get('company-postal-code'));
}

export function validatePartnersForm(form) {
    const formData = new FormData(form);

    return formData.get('partner-name').length >= 3 &&
        validateEmail(formData.get('partner-email')) &&
        formData.get('partner-phone').length >= 10 &&
        formData.get('partner-cpf').length >= 11 &&
        formData.get('partner-rg').length >= 8;
}

export function validateObligationsForm(form) {
    const formData = new FormData(form);

    return formData.get('obligation-name').length >= 3 &&
        formData.get('obligation-department').length >= 3 &&
        formData.get('obligation-responsible').length >= 3 &&
        formData.get('obligation-delivery-month').length >= 3 &&
        !isNaN(formData.get('obligation-reminder-days')) &&
        formData.get('obligation-reminder-type').length >= 3 &&
        formData.get('obligation-competencies').length >= 3;
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}


//VALIDA E PROCESSA OS FORMULARIOS SEU BOT