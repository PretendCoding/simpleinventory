export async function add(filter, formData) {

    let results;

    try {
        await fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter)
        })
        .then(response => response.text())
        .then(data => results = data);

        await fetch('/saveImage', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.path);
        });
    } catch (error) {
        console.error(error);
    } finally {
        return JSON.parse(results);
    }
}