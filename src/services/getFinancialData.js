export default async function getFinancialData() {
    const URL = `https://api.flashvolve.io/api:6bkufMCs/financeiro`;
    const request = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const response = await request.json();

    return response;
}
