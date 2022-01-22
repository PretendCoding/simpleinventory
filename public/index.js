import { find } from "./ajaxRequests/find.js";
import { add } from "./ajaxRequests/add.js";
import { createTable, addItemToTable } from "./createInventoryTable.js";

const $ = (elemId) => document.getElementById(elemId);

/*
    I need the following functions for mongodb; this should be imported under the namespace Mongo so I can just do Mongo.findOne
        findOne(filter, options, callback) // This will be used for finding a specific item
        findMany(filter, options) // This will find multiple with the following filter
        sort(filter, ascending) // This sorts by string filter and either ascending 1 or descending -1
        update(filter, data) // This updates based on an object filter which identifies the item to update, and an object data which is the info to update
        insert(filter) // Creates a new item in the inventory with data of object filter
        delete(filter) // Deletes an item of object filter
*/

main();

async function main() {
    const results = await find({});
    createTable(results);
}

$('addItemButton').addEventListener('click', () => {
    $('addItemModal').style.display = 'block';
    $('addItemAjaxButtom').addEventListener('click', addItem);
});

$('itemIdAdd').addEventListener('focusout', async (e) => {
    let target = e.currentTarget;

    target.classList.remove('input-error');
    $('addItemAjaxButtom').disabled = false;
    $('itemIdErrorAlreadyExists').classList.add('hidden');
    $('itemIdErrorEmpty').classList.add('hidden');

    if (handleAddItemInputErrors(target.value === '', target, 'itemIdErrorEmpty')) return;
    
    const results = await find({itemId: e.currentTarget.value});
    if (handleAddItemInputErrors(results.length !== 0, target, 'itemIdErrorAlreadyExists')) return;
});

$('nameAdd').addEventListener('focusout', (e) => {
    let target = e.currentTarget;

    target.classList.remove('input-error');
    $('addItemAjaxButtom').disabled = false;
    $('nameErrorEmpty').classList.add('hidden');

    if (handleAddItemInputErrors(target.value === '', target, 'nameErrorEmpty')) return;
});

$('unitMeasurementAdd').addEventListener('focusout', (e) => {
    let target = e.currentTarget;

    target.classList.remove('input-error');
    $('addItemAjaxButtom').disabled = false;
    $('unitErrorEmpty').classList.add('hidden');

    if (handleAddItemInputErrors(target.value === '', target, 'unitErrorEmpty')) return;
});

$('quantityAdd').addEventListener('focusout', (e) => {
    let target = e.currentTarget;

    target.classList.remove('input-error');
    $('addItemAjaxButtom').disabled = false;
    $('quantityErrorEmpty').classList.add('hidden');

    if (handleAddItemInputErrors(target.value === '', target, 'quantityErrorEmpty')) return;
});



function handleAddItemInputErrors(error, element, errorMessageElementId) {
    if (error) {
        element.classList.add('input-error');
        $('addItemAjaxButtom').disabled = true;
        $(errorMessageElementId).classList.remove('hidden');
        return true;
    } else {
        element.classList.remove('input-error');
        $('addItemAjaxButtom').disabled = false;
        $(errorMessageElementId).classList.add('hidden');
        return false;
    }
}

async function addItem() {
    let filter = {
        itemId: $('itemIdAdd').value,
        name: $('nameAdd').value,
        unitMeasurement: $('unitMeasurementAdd').value,
        quantity: $('quantityAdd').value
    }
    $('itemIdAdd').value = '';
    $('nameAdd').value = '';
    $('unitMeasurementAdd').value = '';
    $('quantityAdd').value = '';
    const result = await add(filter);
    addItemToTable(result);
}