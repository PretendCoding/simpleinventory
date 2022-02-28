import { showUpdateModal } from "./updateItem.js";

// This function should take in a JSON object which contains the list of inventory objects. This function should only be concerned with creating the HTML table

export function createTable(data) {

    const container = document.querySelector('[data-inventory-container]');
    container.innerHTML = '';

    const itemTemplate = document.querySelector('[data-item-template]');

    window.sessionStorage.tableData = JSON.stringify(data);
    
    data.forEach(element => {
        const item = itemTemplate.content.cloneNode(true).children[0];
        item._id = element._id;
        showUpdateModal(item);
        
        const itemId = item.querySelector('[data-itemId]');
        const nameElem = item.querySelector('[data-name]');
        const unitMeasurement = item.querySelector('[data-unitMeasurement]');
        const quantity = item.querySelector('[data-quantity]');
        const img = item.querySelector('[data-img]');
        
        itemId.innerHTML = `<strong>Item ID:</strong> ${element.itemId}`;
        itemId.itemId = element.itemId;
        itemId._id = element._id;
        
        nameElem.innerHTML = `<strong>Name:</strong> ${element.name}`;
        nameElem.name = element.name;
        
        unitMeasurement.innerHTML = `<strong>Unit Measurement:</strong> ${element.unitMeasurement}`;
        unitMeasurement.unitMeasurement = element.unitMeasurement;
        
        quantity.innerHTML = `<strong>Quantity:</strong> ${element.quantity}`;
        quantity.quantity = element.quantity;
        
        img.src = './images/itemImages/' + element.image;
        img.onerror = () => {
            img.src = "./images/no-image-found.jpg";
        }

        
        container.append(item);
    });
    
    return; // everything after this point is explicitly populating the old table, so we don't need it right now


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

    const container = document.querySelector('[data-inventory-container]');
    const itemTemplate = document.querySelector('[data-item-template]');
    
    const item = itemTemplate.content.cloneNode(true).children[0];
    item._id = element._id;
    showUpdateModal(item);
    
    const itemId = item.querySelector('[data-itemId]');
    const nameElem = item.querySelector('[data-name]');
    const unitMeasurement = item.querySelector('[data-unitMeasurement]');
    const quantity = item.querySelector('[data-quantity]');
    const img = item.querySelector('[data-img]');
    
    itemId.innerHTML = `<strong>Item ID:</strong> ${element.itemId}`;
    itemId.itemId = element.itemId;
    itemId._id = element._id;
    
    nameElem.innerHTML = `<strong>Name:</strong> ${element.name}`;
    nameElem.name = element.name;
    
    unitMeasurement.innerHTML = `<strong>Unit Measurement:</strong> ${element.unitMeasurement}`;
    unitMeasurement.unitMeasurement = element.unitMeasurement;
    
    quantity.innerHTML = `<strong>Quantity:</strong> ${element.quantity}`;
    quantity.quantity = element.quantity;
    
    img.src = './images/itemImages/' + element.image;
    img.onerror = () => {
        img.src = "./images/no-image-found.jpg";
    }

    
    container.append(item);
}

// export function addItemToTable(element) {
//     let tbody = document.querySelector('tbody');

//     if (element.itemId !== 'ABC123') {
//         const tr = tbody.appendChild(document.createElement('tr'));
//         tr.classList.add('update-item-clickable-row');
//         showUpdateModal(tr);

//         const idElem = tr.appendChild(document.createElement('td'));
//         idElem.textContent = element.itemId;
//         idElem.id = element._id;

//         const nameElem = tr.appendChild(document.createElement('td'));
//         nameElem.textContent = element.name;

//         const unitElem = tr.appendChild(document.createElement('td'));
//         unitElem.textContent = element.unitMeasurement;

//         const quantityElem = tr.appendChild(document.createElement('td'));
//         quantityElem.textContent = element.quantity;
//     }
// }