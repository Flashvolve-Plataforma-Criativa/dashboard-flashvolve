export default async function getAllCompanysQt() {
    const URL = `https://api.flashvolve.io/api:6bkufMCs/dados_empresas`;
    const request = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const response = await request.json();

    return response;
}
