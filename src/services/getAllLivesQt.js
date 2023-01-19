export default async function getAllLivesQt() {
    const URL = `https://api.flashvolve.io/api:6bkufMCs/getAllClientes`;
    const request = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const response = await request.json();

    return response;
}
