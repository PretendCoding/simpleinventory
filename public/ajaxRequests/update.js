export async function update(filter, options) {

    let results;

    try {
        await fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter)
        })
        .then(response => response.text())
        .then(data => results = data);
    } catch (error) {
        console.error(error);
    } finally {
        return JSON.parse(results);
    }
}