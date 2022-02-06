// window.sessionStorage.tableData
import { $ } from "./utilities.js";
import { addItemToTable } from "./createInventoryTable.js";

const stateChange = setInterval(() => {
    if (document.readyState == 'complete'){
        clearInterval(stateChange);
        main();
    }
}, 100);

function main() {
    ////// Click Events

    $('tableSearch').addEventListener('input', () => {
        const table = JSON.parse(window.sessionStorage.tableData);
        let data;

        document.querySelector('tbody').innerHTML = '';

        table.forEach(item => {

            let value = $('tableSearch').value;

            if (item.name.toLowerCase().includes(value.toLowerCase())) {
                addItemToTable(item);
            }
        })

    });
}