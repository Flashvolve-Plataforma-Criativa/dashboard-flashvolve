export default async function getUsers(company) {
    const URL = `https://api.flashvolve.io/api:GBD2ICmZ/usuarios?empresa=${company}`;

    const request = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const response = await request.json();

    return response;
}
