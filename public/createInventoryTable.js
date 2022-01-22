// This function should take in a JSON object which contains the list of inventory objects. This function should only be concerned with creating the HTML table

export function createTable(data) {

    const table = document.body.appendChild(document.createElement('table'));
    const thead = table.appendChild(document.createElement('thead'));
    const tbody = table.appendChild(document.createElement('tbody'));

    const trHead = thead.appendChild(document.createElement('tr'));

    thead.innerHTML = '<th>Item ID</th><th>Item Name</th><th>Unit</th><th>Quantity</th>';

    data.forEach(element => { addItemToTable(element, tbody); });
}

export function addItemToTable(element) {
    let tbody = document.querySelector('tbody');

    if (element.itemId !== 'ABC123') {
        const tr = tbody.appendChild(document.createElement('tr'));

        const idElem = tr.appendChild(document.createElement('td'));
        idElem.textContent = element.itemId;
        idElem.id = element._id;

        const nameElem = tr.appendChild(document.createElement('td'));
        nameElem.textContent = element.name;

        const unitElem = tr.appendChild(document.createElement('td'));
        unitElem.textContent = element.unitMeasurement;

        const quantityElem = tr.appendChild(document.createElement('td'));
        quantityElem.textContent = element.quantity;
    }
}