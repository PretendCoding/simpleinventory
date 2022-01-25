import { showUpdateModal } from "./updateItem.js";

// This function should take in a JSON object which contains the list of inventory objects. This function should only be concerned with creating the HTML table

export function createTable(data) {
    
    // let thead = document.querySelector('thead');

    // if (thead === null) {
    //     let theadTable = document.body.appendChild(document.createElement('table'));
    //     theadTable.classList.add('inventory-table');
    //     thead = theadTable.appendChild(document.createElement('thead'));
    //     const trHead = thead.appendChild(document.createElement('tr'));
    //     trHead.innerHTML = '<th>Item ID</th><th>Item Name</th><th>Unit</th><th>Quantity</th>';
    //     console.log();
    // }

    const oldTable = document.getElementById('mainInventoryTable');

    let table;

    if (oldTable !== null) {
        oldTable.innerHTML = '';
        table = oldTable;
    } else {        
        let myDiv = document.getElementsByClassName('tbl-content')[0];
        table = myDiv.appendChild(document.createElement('table'));
        table.id = "mainInventoryTable";
        table.classList.add('inventory-table');
    }
    
    const tbody = table.appendChild(document.createElement('tbody'));

    data.forEach(element => { addItemToTable(element, tbody); });
}

export function addItemToTable(element) {
    let tbody = document.querySelector('tbody');

    if (element.itemId !== 'ABC123') {
        const tr = tbody.appendChild(document.createElement('tr'));
        tr.classList.add('update-item-clickable-row');
        showUpdateModal(tr);

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