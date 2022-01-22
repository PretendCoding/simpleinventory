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

async function addItem() {
    let filter = {
        itemId: $('itemIdAdd').value,
        name: $('nameAdd').value,
        unitMeasurement: $('unitMeasurementAdd').value,
        quantity: $('quantityAdd').value
    }
    const result = await add(filter);
    addItemToTable(result);
}