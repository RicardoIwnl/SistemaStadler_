export function exportTableToCSV(tableId, filename) {
    const rows = Array.from(document.querySelectorAll(`#${tableId} tr`));
    const headers = Array.from(document.querySelectorAll(`#${tableId} th`))
                         .map(th => `"${th.textContent}"`)
                         .join(',');
    const csvContent = [headers, ...rows.map(row => {
        return Array.from(row.cells).map(cell => `"${cell.textContent.replace(/"/g, '""')}"`).join(',');
    })].join('\r\n');

    const encodedUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function handleFileImport(event, processImportCallback) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => processImportCallback(e.target.result);
        reader.readAsText(file);
    }
}

//IMPORTA E EXPORTA DADOS DE/PARA ARQUIVOS.